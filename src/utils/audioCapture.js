export async function startAudioCapture(socket) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  const audioContext = new AudioContext({
    sampleRate: 16000,
  });

  const source = audioContext.createMediaStreamSource(stream);

  await audioContext.audioWorklet.addModule("/processor.js");

  const processor = new AudioWorkletNode(audioContext, "audio-processor");

  processor.port.onmessage = ({ data }) => {
    const float32 = data;

    const pcm = new Int16Array(float32.length);

    for (let i = 0; i < float32.length; i++) {
      let sample = Math.max(-1, Math.min(1, float32[i]));

      pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }

    socket.emit("audio-data", pcm.buffer);
  };

  source.connect(processor);

  processor.connect(audioContext.destination);

  return {
    stream,
    audioContext,
    processor,
  };
}
