import { io } from "socket.io-client";
import.meta.env.VITE_API_URL;

const socket = io(`${import.meta.env.VITE_API_URL}`, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connect Error:", err);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Disconnected:", reason);
});

export default socket;
