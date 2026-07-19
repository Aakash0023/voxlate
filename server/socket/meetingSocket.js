import { createDeepgramConnection } from "../services/deepgram.js";
import { processTranscript } from "../services/gemini.js";

export function registerMeetingSocket(io) {
  io.on("connection", (socket) => {
    console.log("🟢 Client Connected:", socket.id);

    let deepgram = null;
    let transcriptBuffer = "";
    let timer = null;
    let targetLanguage = "English";
    let processing = false;

    const processBuffer = async () => {
      if (processing) return;

      const finalTranscript = transcriptBuffer.trim();
      transcriptBuffer = "";

      if (!finalTranscript) return;
      if (finalTranscript.split(/\s+/).length < 3) return;

      processing = true;

      try {
        console.log("🚀 Processing:", finalTranscript);

        const ai = await processTranscript(finalTranscript, targetLanguage);

        socket.emit("ai-update", {
          transcript: finalTranscript,
          translation: ai.translation || "",
          summary: ai.summary || "",
          decision: ai.decision || "",
          task: ai.task || "",
        });

        console.log("✅ AI Update Sent");
      } catch (err) {
        console.error("❌ Gemini Error:", err);
      } finally {
        processing = false;
      }
    };

    socket.on("join-meeting", ({ language } = {}) => {
      console.log("🎤 Joining Meeting");

      targetLanguage = language || "English";

      deepgram = createDeepgramConnection((transcript) => {
        if (!transcript.trim()) return;

        console.log("📝", transcript);

        transcriptBuffer += " " + transcript;

        if (timer) clearTimeout(timer);

        timer = setTimeout(processBuffer, 700);
      });
    });

    socket.on("change-language", ({ language }) => {
      targetLanguage = language || "English";

      console.log("🌍 Translation Language:", targetLanguage);
    });

    socket.on("audio-data", (audio) => {
      if (!deepgram) return;

      try {
        if (!deepgram.getReadyState || deepgram.getReadyState() !== 1) {
          return;
        }

        if (audio instanceof Buffer) {
          deepgram.send(audio);
          return;
        }

        if (audio instanceof ArrayBuffer) {
          deepgram.send(Buffer.from(audio));
          return;
        }

        if (audio instanceof Uint8Array) {
          deepgram.send(Buffer.from(audio));
          return;
        }

        if (Array.isArray(audio)) {
          deepgram.send(Buffer.from(audio));
          return;
        }

        console.log("Unknown Audio Type:", audio?.constructor?.name);
      } catch (err) {
        console.error("Deepgram Send Error:", err);
      }
    });

    socket.on("leave-meeting", () => {
      console.log("👋 Leaving Meeting");

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      transcriptBuffer = "";

      if (deepgram) {
        deepgram.finish();
        deepgram = null;
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client Disconnected");

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      transcriptBuffer = "";

      if (deepgram) {
        deepgram.finish();
        deepgram = null;
      }
    });
  });
}
