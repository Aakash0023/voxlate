import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import { Server } from "socket.io";
import livekitRoutes from "./routes/livekit.js";
import healthRoute from "./routes/health.js";
import { registerMeetingSocket } from "./socket/meetingSocket.js";

console.log("Gemini Key:", process.env.GEMINI_API_KEY);

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://YOUR-VERCEL-URL.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(express.json());

app.use("/api/livekit", livekitRoutes);
app.use("/api/health", healthRoute);

registerMeetingSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("🚀 VOXLATE Server Running");
  console.log(`🌍 http://localhost:${PORT}`);
});
