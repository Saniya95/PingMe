const mongoose = require("mongoose");

/**
 * Establish a MongoDB connection using Mongoose.
 * - Reads URI from process.env.MONGO_URI
 * - Logs success and error messages
 * - Does not crash the process on failure
 */
async function connectDB() {
	const uri = process.env.MONGO_URI;

	if (!uri) {
		console.error("[DB] MONGO_URI is not set in environment variables");
		return;
		
	}

	console.log("🔥 Loaded MONGO_URI:", process.env.MONGO_URI);


	try {
		const conn = await mongoose.connect(uri);
		console.log(`[DB] Connected to MongoDB: ${conn.connection.host}`);
	} catch (err) {
		console.error("[DB] MongoDB connection error:", err && err.message ? err.message : err);
	}
}

module.exports = connectDB;
