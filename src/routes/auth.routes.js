const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword
} = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", authenticateToken, getCurrentUser);
router.put("/profile", authenticateToken, updateProfile);
router.put("/change-password", authenticateToken, changePassword);

module.exports = router;
