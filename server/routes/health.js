import { Router } from "express";
import { processTranscript } from "../services/gemini.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VOXLATE API Running",
  });
});

router.post("/test-ai", async (req, res) => {
  try {
    const { transcript } = req.body;

    const result = await processTranscript(transcript);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Gemini Error",
    });
  }
});

export default router;
