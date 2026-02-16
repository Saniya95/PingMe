const Card = require("../models/Card");
const { asyncHandler, AppError } = require("../middlewares/error.middleware");

/**
 * @desc    Get all active landing cards
 * @route   GET /api/landing/cards
 * @access  Public
 */
const getLandingCards = asyncHandler(async (req, res) => {
  // Get all active cards sorted by order
  const cards = await Card.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .select("-__v");

  res.status(200).json({
    success: true,
    message: "Landing cards retrieved successfully",
    data: {
      cards
    }
  });
});

/**
 * @desc    Create new landing card
 * @route   POST /api/landing/cards
 * @access  Private (Admin only)
 */
const createCard = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    icon,
    actionType,
    requiresAuth,
    metadata,
    buttonText,
    backgroundColor,
    textColor,
    order
  } = req.body;

  // Validate required fields
  if (!title || !description || !icon || !actionType) {
    throw new AppError("Please provide title, description, icon, and actionType", 400);
  }

  const card = await Card.create({
    title,
    description,
    icon,
    actionType,
    requiresAuth: requiresAuth || false,
    metadata: metadata || {},
    buttonText: buttonText || "Click Here",
    backgroundColor: backgroundColor || "#ffffff",
    textColor: textColor || "#000000",
    order: order || 0
  });

  res.status(201).json({
    success: true,
    message: "Card created successfully",
    data: {
      card
    }
  });
});

/**
 * @desc    Update landing card
 * @route   PUT /api/landing/cards/:id
 * @access  Private (Admin only)
 */
const updateCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const card = await Card.findById(id);
  
  if (!card) {
    throw new AppError("Card not found", 404);
  }

  const updatedCard = await Card.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).select("-__v");

  res.status(200).json({
    success: true,
    message: "Card updated successfully",
    data: {
      card: updatedCard
    }
  });
});

/**
 * @desc    Delete landing card
 * @route   DELETE /api/landing/cards/:id
 * @access  Private (Admin only)
 */
const deleteCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const card = await Card.findById(id);
  
  if (!card) {
    throw new AppError("Card not found", 404);
  }

  await Card.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Card deleted successfully"
  });
});

/**
 * @desc    Toggle card active status
 * @route   PATCH /api/landing/cards/:id/toggle
 * @access  Private (Admin only)
 */
const toggleCardStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const card = await Card.findById(id);
  
  if (!card) {
    throw new AppError("Card not found", 404);
  }

  card.isActive = !card.isActive;
  await card.save();

  res.status(200).json({
    success: true,
    message: `Card ${card.isActive ? 'activated' : 'deactivated'} successfully`,
    data: {
      card
    }
  });
});

/**
 * @desc    Get single card by ID
 * @route   GET /api/landing/cards/:id
 * @access  Public
 */
const getCardById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const card = await Card.findById(id).select("-__v");
  
  if (!card) {
    throw new AppError("Card not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Card retrieved successfully",
    data: {
      card
    }
  });
});

module.exports = {
  getLandingCards,
  createCard,
  updateCard,
  deleteCard,
  toggleCardStatus,
  getCardById
};