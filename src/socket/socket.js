import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
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
