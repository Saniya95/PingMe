const UserAction = require("../models/UserAction");
const Card = require("../models/Card");
const { asyncHandler, AppError } = require("../middlewares/error.middleware");

/**
 * @desc    Handle card button action
 * @route   POST /api/actions/:actionType
 * @access  Public/Private (depends on card requiresAuth)
 */
const handleAction = asyncHandler(async (req, res) => {
  const { actionType } = req.params;
  const { cardId, metadata = {} } = req.body;

  // Get client info
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || '';

  // If user is authenticated, get user ID
  const userId = req.user ? req.user._id : null;

  // Validate action type
  const validActionTypes = [
    "navigate_chat",
    "open_vscode", 
    "start_conversation",
    "view_profile",
    "settings",
    "custom"
  ];

  if (!validActionTypes.includes(actionType)) {
    throw new AppError("Invalid action type", 400);
  }

  // If cardId is provided, check if it exists and get requirements
  let card = null;
  if (cardId) {
    card = await Card.findById(cardId);
    if (!card) {
      throw new AppError("Card not found", 404);
    }

    // Check if card requires auth and user is not authenticated
    if (card.requiresAuth && !userId) {
      throw new AppError("Authentication required for this action", 401);
    }
  }

  // Log the action (don't fail if logging fails)
  let actionLog = null;
  if (userId) {
    actionLog = await UserAction.logAction(
      userId,
      actionType,
      { ...metadata, cardId },
      { ipAddress, userAgent }
    );
  }

  // Handle different action types
  let responseData = {};
  let message = "";

  switch (actionType) {
    case "navigate_chat":
      message = "Navigate to chat action logged";
      responseData = {
        redirect: "/chat",
        requiresAuth: card?.requiresAuth || false
      };
      break;
      
    case "open_vscode":
      message = "VS Code action initiated";
      responseData = {
        redirect: "/vscode",
        external: false
      };
      break;
      
    case "start_conversation":
      message = "Start conversation action logged";
      responseData = {
        redirect: userId ? "/conversation" : "/login",
        requiresAuth: true
      };
      break;
      
    case "view_profile":
      message = "Profile view action logged";
      responseData = {
        redirect: userId ? "/profile" : "/login",
        requiresAuth: true
      };
      break;
      
    case "settings":
      message = "Settings action logged";
      responseData = {
        redirect: userId ? "/settings" : "/login",
        requiresAuth: true
      };
      break;
      
    case "custom":
      message = "Custom action logged";
      responseData = {
        ...metadata,
        cardData: card || null
      };
      break;
      
    default:
      throw new AppError("Action type not implemented", 501);
  }

  res.status(200).json({
    success: true,
    message,
    data: {
      actionType,
      userId,
      cardId: card?._id || null,
      actionId: actionLog?._id || null,
      ...responseData
    }
  });
});

/**
 * @desc    Get user actions history
 * @route   GET /api/actions/history
 * @access  Private
 */
const getUserActionHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 20, actionType } = req.query;

  // Build query
  const query = { user: userId };
  if (actionType) {
    query.actionType = actionType;
  }

  const skip = (page - 1) * limit;

  // Get actions with pagination
  const actions = await UserAction.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip(skip)
    .select("-__v")
    .lean();

  // Get total count
  const total = await UserAction.countDocuments(query);

  res.status(200).json({
    success: true,
    message: "User action history retrieved successfully",
    data: {
      actions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

/**
 * @desc    Get action analytics
 * @route   GET /api/actions/analytics
 * @access  Private (Admin only)
 */
const getActionAnalytics = asyncHandler(async (req, res) => {
  const { startDate, endDate, actionType } = req.query;

  // Build match query
  const matchQuery = {};
  
  if (startDate || endDate) {
    matchQuery.createdAt = {};
    if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
    if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
  }
  
  if (actionType) {
    matchQuery.actionType = actionType;
  }

  // Aggregation pipeline
  const pipeline = [
    { $match: matchQuery },
    {
      $group: {
        _id: "$actionType",
        count: { $sum: 1 },
        successCount: { 
          $sum: { $cond: ["$success", 1, 0] } 
        },
        failureCount: { 
          $sum: { $cond: ["$success", 0, 1] } 
        },
        uniqueUsers: { $addToSet: "$user" }
      }
    },
    {
      $addFields: {
        actionType: "$_id",
        uniqueUserCount: { $size: "$uniqueUsers" },
        successRate: { 
          $multiply: [
            { $divide: ["$successCount", "$count"] },
            100
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        uniqueUsers: 0
      }
    },
    { $sort: { count: -1 } }
  ];

  const analytics = await UserAction.aggregate(pipeline);

  // Get total stats
  const totalActions = await UserAction.countDocuments(matchQuery);
  const totalUsers = await UserAction.distinct("user", matchQuery);

  res.status(200).json({
    success: true,
    message: "Action analytics retrieved successfully",
    data: {
      analytics,
      summary: {
        totalActions,
        totalUniqueUsers: totalUsers.length,
        dateRange: { startDate, endDate }
      }
    }
  });
});

module.exports = {
  handleAction,
  getUserActionHistory,
  getActionAnalytics
};