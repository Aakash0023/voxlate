class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];

    if (!input.length) return true;

    const channel = input[0];

    if (!channel) return true;

    this.port.postMessage(channel.slice(0));

    return true;
  }
}

registerProcessor("audio-processor", PCMProcessor);
