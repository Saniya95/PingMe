const mongoose = require("mongoose");

const { Schema } = mongoose;

// User schema supports both email+password and phone (OTP-based) authentication
const UserSchema = new Schema(
	{
		name: { type: String, trim: true, required: true },
		email: { type: String, trim: true, lowercase: true }, // optional, unique via index
		phone: { type: String, trim: true }, // optional, unique via index
		password: { type: String }, // optional; hashed later in service layer
		avatar: { type: String, trim: true }, // optional URL or path
		about: { type: String, trim: true }, // optional bio

		isEmailVerified: { type: Boolean, default: false },
		isPhoneVerified: { type: Boolean, default: false },
		isOnline: { type: Boolean, default: false },
		lastSeen: { type: Date },
	},
	{ timestamps: true }
);

// Indexes
// - Unique sparse indexes allow multiple docs without email/phone while ensuring uniqueness when present.
UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ phone: 1 }, { unique: true, sparse: true });

// Export model (guard against model recompilation in dev/hot-reload environments)
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

