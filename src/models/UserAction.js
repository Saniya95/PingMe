const mongoose = require("mongoose");

const { Schema } = mongoose;

// UserAction schema for tracking user interactions
const UserActionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"]
    },
    actionType: {
      type: String,
      required: [true, "Action type is required"],
      enum: [
        "navigate_chat",
        "open_vscode",
        "start_conversation",
        "view_profile",
        "settings",
        "card_click",
        "login",
        "logout",
        "register",
        "custom"
      ]
    },
    metadata: {
      type: Schema.Types.Mixed, // For any additional data about the action
      default: {}
    },
    ipAddress: {
      type: String,
      trim: true
    },
    userAgent: {
      type: String,
      trim: true
    },
    sessionId: {
      type: String,
      trim: true
    },
    success: {
      type: Boolean,
      default: true
    },
    errorMessage: {
      type: String,
      trim: true
    },
    duration: {
      type: Number, // In milliseconds, if applicable
      min: 0
    }
  },
  { 
    timestamps: true 
  }
);

// Indexes for efficient querying
UserActionSchema.index({ user: 1, createdAt: -1 });
UserActionSchema.index({ actionType: 1 });
UserActionSchema.index({ createdAt: -1 });

// Static method to log user action
UserActionSchema.statics.logAction = async function(userId, actionType, metadata = {}, additionalData = {}) {
  try {
    const action = await this.create({
      user: userId,
      actionType,
      metadata,
      ...additionalData
    });
    return action;
  } catch (error) {
    console.error('Error logging user action:', error);
    // Don't throw error to avoid breaking the main flow
    return null;
  }
  };

// Instance method to mark action as failed
UserActionSchema.methods.markAsFailed = async function(errorMessage) {
  this.success = false;
  this.errorMessage = errorMessage;
  return await this.save();
};

// Export model
module.exports = mongoose.models.UserAction || mongoose.model("UserAction", UserActionSchema);