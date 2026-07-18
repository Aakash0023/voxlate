export async function startAudioCapture(socket) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  const audioContext = new AudioContext();

  console.log("🎤 Actual Sample Rate:", audioContext.sampleRate);

  await audioContext.audioWorklet.addModule("/audio-processor.js");

  const source = audioContext.createMediaStreamSource(stream);

  const processor = new AudioWorkletNode(audioContext, "pcm-processor");

  const silentGain = audioContext.createGain();
  silentGain.gain.value = 0;

  source.connect(processor);
  processor.connect(silentGain);
  silentGain.connect(audioContext.destination);

  let pcmQueue = [];

  processor.port.onmessage = (event) => {
    const input = event.data;

    const downsampled = downsampleBuffer(input, audioContext.sampleRate, 16000);

    const pcm = convertFloat32ToInt16(downsampled);

    pcmQueue.push(...pcm);

    const CHUNK_SIZE = 3200;

    while (pcmQueue.length >= CHUNK_SIZE) {
      const chunk = new Int16Array(CHUNK_SIZE);

      for (let i = 0; i < CHUNK_SIZE; i++) {
        chunk[i] = pcmQueue.shift();
      }

      socket.emit("audio-data", chunk.buffer);
    }
  };

  return {
    stream,
    audioContext,
    processor,
  };
}

function downsampleBuffer(buffer, sampleRate, outRate) {
  if (sampleRate === outRate) {
    return buffer;
  }

  const ratio = sampleRate / outRate;
  const newLength = Math.round(buffer.length / ratio);

  const result = new Float32Array(newLength);

  let offsetResult = 0;
  let offsetBuffer = 0;

  while (offsetResult < newLength) {
    const nextOffset = Math.round((offsetResult + 1) * ratio);

    let accum = 0;
    let count = 0;

    for (let i = offsetBuffer; i < nextOffset && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }

    result[offsetResult] = count ? accum / count : 0;

    offsetResult++;
    offsetBuffer = nextOffset;
  }

  return result;
}

function convertFloat32ToInt16(buffer) {
  const pcm = new Int16Array(buffer.length);

  for (let i = 0; i < buffer.length; i++) {
    let sample = Math.max(-1, Math.min(1, buffer[i]));

    pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }

  return pcm;
}
