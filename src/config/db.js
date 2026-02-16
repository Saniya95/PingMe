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

	console.log("🔥 Attempting to connect to MongoDB Atlas...");
	console.log("🔗 URI:", uri.replace(/:\/\/([^:]+):([^@]+)@/, "://***:***@")); // Hide credentials in log

	try {
		// Configure mongoose settings
		mongoose.set('bufferCommands', false); // Disable buffering
		
		const conn = await mongoose.connect(uri);
		console.log(`✅ [DB] Successfully connected to MongoDB Atlas!`);
		console.log(`📍 [DB] Database: ${conn.connection.name}`);
		console.log(`🏠 [DB] Host: ${conn.connection.host}`);
		console.log(`⚡ [DB] Ready state: ${conn.connection.readyState}`);
		
		// Test the connection
		await mongoose.connection.db.admin().ping();
		console.log("🏓 [DB] Database ping successful!");
		
	} catch (err) {
		console.error("❌ [DB] MongoDB Atlas connection failed:");
		console.error("📝 [DB] Error details:", err.message);
		console.error("🔍 [DB] Common fixes:");
		console.error("   1. Check MongoDB Atlas network access (IP whitelist)");
		console.error("   2. Verify database user credentials");
		console.error("   3. Ensure cluster is running");
		console.error("   4. Check connection string format");
	}
}

module.exports = connectDB;
