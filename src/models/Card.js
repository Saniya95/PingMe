const mongoose = require("mongoose");

const { Schema } = mongoose;

// Card schema for landing page dynamic content
const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Card title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Card description is required"],
      trim: true
    },
    icon: {
      type: String,
      required: [true, "Card icon is required"],
      trim: true
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
        "custom"
      ]
    },
    requiresAuth: {
      type: Boolean,
      default: false
    },
    metadata: {
      type: Schema.Types.Mixed, // For any additional data
      default: {}
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0 // For sorting cards
    },
    buttonText: {
      type: String,
      default: "Click Here"
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    textColor: {
      type: String,
      default: "#000000"
    }
  },
  { 
    timestamps: true 
  }
);

// Index for sorting
CardSchema.index({ order: 1 });
CardSchema.index({ isActive: 1 });

// Export model
module.exports = mongoose.models.Card || mongoose.model("Card", CardSchema);