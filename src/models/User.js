const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

// User schema - production ready with authentication
const UserSchema = new Schema(
	{
		name: { type: String, trim: true, required: [true, "Name is required"] },
		email: { 
			type: String, 
			trim: true, 
			lowercase: true, 
			required: [true, "Email is required"],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
		},
		phone: { type: String, trim: true }, // optional, unique via index
		password: { 
			type: String, 
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters"]
		},
		role: {
			type: String,
			enum: ["user", "admin", "moderator"],
			default: "user"
		},
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
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phone: 1 }, { unique: true, sparse: true });

// Pre-save hook to hash password
UserSchema.pre("save", async function() {
	if (!this.isModified("password")) {
		return;
	}

	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
UserSchema.methods.toJSON = function() {
	const user = this.toObject();
	delete user.password;
	return user;
};

// Export model (guard against model recompilation in dev/hot-reload environments)
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

