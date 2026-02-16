const express = require("express");
const {
  getLandingCards,
  createCard,
  updateCard,
  deleteCard,
  toggleCardStatus,
  getCardById
} = require("../controllers/landingController");
const { authenticateToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public routes
router.get("/cards", getLandingCards);
router.get("/cards/:id", getCardById);

// Protected routes (Admin only - for now, any authenticated user can manage cards)
// In production, you might want to add an admin role check
router.post("/cards", authenticateToken, createCard);
router.put("/cards/:id", authenticateToken, updateCard);
router.delete("/cards/:id", authenticateToken, deleteCard);
router.patch("/cards/:id/toggle", authenticateToken, toggleCardStatus);

module.exports = router;