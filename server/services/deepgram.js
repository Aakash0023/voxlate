import "dotenv/config";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

export function createDeepgramConnection(onTranscript) {
  const connection = deepgram.listen.live({
    model: "nova-2",
    language: "en",
    encoding: "linear16",
    sample_rate: 16000,
    channels: 1,
    punctuate: true,
    smart_format: true,
    interim_results: true,
  });

  connection.on(LiveTranscriptionEvents.Open, () => {
    console.log("🎤 Deepgram Connected");
    console.log("🟢 Ready State:", connection.getReadyState());
  });

  connection.on(LiveTranscriptionEvents.Transcript, (data) => {
    const transcript = data.channel?.alternatives?.[0]?.transcript ?? "";

    console.log(
      "📝 Deepgram:",
      `"${transcript}"`,
      "| Final:",
      data.is_final,
      "| Speech Final:",
      data.speech_final
    );

    if (!transcript.trim()) return;

    onTranscript(transcript);
  });

  connection.on(LiveTranscriptionEvents.Metadata, (data) => {
    console.log("📄 Metadata:", data);
  });

  connection.on(LiveTranscriptionEvents.Warning, (warning) => {
    console.log("⚠️ Warning:", warning);
  });

  connection.on(LiveTranscriptionEvents.Error, (error) => {
    console.error("❌ Deepgram Error:", error);
  });

  connection.on(LiveTranscriptionEvents.Close, () => {
    console.log("🔴 Deepgram Closed");
  });

  return connection;
}
