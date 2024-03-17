import { useEffect } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const token = localStorage.getItem("token");

  //Dynamic server URL based on environment.
  const serverUrl =
    process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:3000";
  const socket = io(serverUrl, { auth: { token } });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Clean up on component unmount
    return () => {
      socket.off("connect");
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("chat message", (message) => {
      console.log("New message:", message);
      // Update your chat UI with the new message
    });

    useEffect(() => {
      socket.on("notification", (message) => {
        // Display the notification message to the user
        alert(message);
      });

      // Don't forget to clean up this event listener
      return () => {
        socket.off("notification");
      };
    }, []);

    return () => {
      socket.off("chat message");
    };
  }, []);

  return <div>{/* Chat UI goes here */}</div>;
};

export default Chat;
