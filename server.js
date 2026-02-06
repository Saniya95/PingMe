const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { Server } = require("socket.io");

dotenv.config();

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  console.error(err.stack);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

const connectDB = require("./src/config/db");
const apiRoutes = require("./src/routes");

console.log("🔄 Starting PingMe server...");
console.log(`📁 NODE_ENV: ${process.env.NODE_ENV || "development"}`);
console.log(`📁 SKIP_DB: ${process.env.SKIP_DB}`);

// Initialize Express
const app = express();

// Global middleware
app.use(cors()); // Allow all origins
// Simple request logger
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());

// Serve static client assets from Vite build (client/dist)
const CLIENT_DIST = path.join(__dirname, "client", "dist");
app.use(express.static(CLIENT_DIST));

// Mount API routes
app.use("/api", apiRoutes);

// SPA fallback: serve index.html for non-API routes
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(CLIENT_DIST, "index.html"));
});

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io to the HTTP server with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket configuration
const initSocket = require("./src/config/socket");
initSocket(io);

// Connect to database (non-fatal on failure; can be skipped via env)
if (process.env.SKIP_DB !== "true") {
  connectDB();
}

// Port config & start server with fallback on EADDRINUSE
let PORT = parseInt(process.env.PORT, 10) || 5000;
function start(p) {
  PORT = p;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    const next = PORT + 1;
    console.warn(`[Server] Port ${PORT} in use. Retrying on ${next}...`);
    start(next);
  } else {
    throw err;
  }
});

start(PORT);

module.exports = server;
