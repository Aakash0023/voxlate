import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function processTranscript(transcript, language = "English") {
  const prompt = `
You are VOXLATE, an AI Meeting Assistant.

Translate the transcript into ${language}.

Also analyze the meeting and return ONLY valid JSON.

{
  "translation": "",
  "decision": "",
  "task": "",
  "summary": ""
}

Transcript:
${transcript}
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  let text = response.text;

  if (typeof text === "function") {
    text = text();
  }

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.log("Gemini Response:", text);

    return {
      translation: "",
      decision: "",
      task: "",
      summary: "",
    };
  }
}
