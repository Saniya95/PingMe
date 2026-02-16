const express = require("express");
const {
  handleAction,
  getUserActionHistory,
  getActionAnalytics
} = require("../controllers/actionController");
const { authenticateToken, optionalAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

// Action handling routes - some require auth, others are optional based on card settings
router.post("/:actionType", optionalAuth, handleAction);

// Protected routes
router.get("/history", authenticateToken, getUserActionHistory);

// Admin routes (for now, any authenticated user can view analytics)
// In production, you might want to add an admin role check
router.get("/analytics", authenticateToken, getActionAnalytics);

module.exports = router;