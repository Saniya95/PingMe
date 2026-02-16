const express = require("express");

// Import route modules
const authRoutes = require("./auth.routes");
const landingRoutes = require("./landingRoutes");
const actionRoutes = require("./actionRoutes");

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    service: "PingMe API",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Register route modules
router.use("/auth", authRoutes);
router.use("/landing", landingRoutes);
router.use("/actions", actionRoutes);

// API information endpoint
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to PingMe API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      landing: "/api/landing",
      actions: "/api/actions",
      health: "/api/health"
    },
    documentation: "Visit /api/health for service status"
  });
});

module.exports = router;