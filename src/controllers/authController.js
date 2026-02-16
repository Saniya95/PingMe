const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const { asyncHandler, AppError } = require("../middlewares/error.middleware");

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    
  console.log("🔥 REGISTER API HIT");
  console.log("BODY:", req.body);
  console.log("📍 MongoDB Connection State:", require('mongoose').connection.readyState);
    
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    throw new AppError("Please provide name, email, and password", 400);
  }

  console.log("🔍 Checking for existing user...");
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  console.log("📝 Existing user check result:", existingUser ? "User exists" : "No existing user");

  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  console.log("✨ Creating new user...");
  
  // Create user
  const user = await User.create({
    name,
    email,
    password
  });
  
  console.log("✅ User created successfully with ID:", user._id);
  console.log("💾 User saved to database:", user.email);

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  const userResponse = user.toJSON();

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      token,
      user: userResponse
    }
  });
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  // Find user by email (include password for comparison)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  const userResponse = user.toJSON();

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: userResponse
    }
  });
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  // User is attached to request by auth middleware
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "User profile retrieved successfully",
    data: {
      user
    }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, about, avatar } = req.body;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (about) fieldsToUpdate.about = about;
  if (avatar) fieldsToUpdate.avatar = avatar;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    fieldsToUpdate,
    { 
      new: true, 
      runValidators: true 
    }
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      user
    }
  });
});

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError("Please provide current password and new password", 400);
  }

  if (newPassword.length < 6) {
    throw new AppError("New password must be at least 6 characters", 400);
  }

  // Get user with password
  const user = await User.findById(req.user._id).select("+password");

  // Check current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);

  if (!isCurrentPasswordValid) {
    throw new AppError("Current password is incorrect", 401);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully"
  });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword
};