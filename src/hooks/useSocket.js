import { useEffect } from "react";
import socket from "../services/socket";

const useSocket = () => {
  useEffect(() => {
    socket.connect();

    socket.emit("join-meeting", "VX-48392");

    socket.on("joined-meeting", (data) => {
      console.log("Joined Meeting", data);
    });

    return () => {
      socket.off("joined-meeting");
    };
  }, []);
};

export default useSocket;
