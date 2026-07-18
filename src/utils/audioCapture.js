export async function startAudioCapture(socket) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      sampleRate: 16000,
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

  processor.port.onmessage = (event) => {
    socket.emit("audio-data", event.data);
  };

  source.connect(processor);
  processor.connect(audioContext.destination);

  return {
    stream,
    audioContext,
    processor,
  };
}
