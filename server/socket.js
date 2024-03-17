// const { Server } = require("socket.io");
// const jwt = require("jsonwebtoken");

// exports.setupSocketIO = (httpServer) => {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3000", // Update this to match your client application URL in production
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (token) {
//       jwt.verify(token, process.env.SECRET, (err, decoded) => {
//         if (err) return next(new Error("Authentication error"));
//         socket.decoded = decoded; // Attach the decoded user info to the socket instance
//         next();
//       });
//     } else {
//       next(new Error("No token provided"));
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.decoded.username); // Accessing decoded user info

//     // Join chat room
//     socket.on("join room", ({ room }) => {
//       socket.join(room);
//       const username = socket.decoded.username;
//       console.log(`${username} joined room: ${room}`);
//       io.to(room).emit("notification", `${username} has joined the chat!`);
//     });

//     // Send Message
//     socket.on("chat message", ({ room, msg }) => {
//       const message = { user: socket.decoded.username, text: msg }; // Include user info in the message
//       io.in(room).emit("chat message", message);
//     });

//     // Leave the chat room
//     socket.on("leave room", ({ room }) => {
//       const username = socket.decoded.username;
//       socket.leave(room);
//       console.log(`${username} left room: ${room}`);
//       io.to(room).emit("notification", `${username} has left the chat.`);
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.decoded.username);
//     });
//   });
// };
