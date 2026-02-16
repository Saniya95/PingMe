const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Card = require("../models/Card");
const connectDB = require("../config/db");

// Load environment variables
dotenv.config();

const seedCards = [
  {
    title: "Start Chatting",
    description: "Begin conversations with friends and colleagues in real-time",
    icon: "💬",
    actionType: "navigate_chat",
    requiresAuth: true,
    buttonText: "Open Chat",
    backgroundColor: "#4F46E5",
    textColor: "#FFFFFF",
    order: 1
  },
  {
    title: "VS Code Integration",
    description: "Open your development environment directly from PingMe",
    icon: "💻",
    actionType: "open_vscode",
    requiresAuth: false,
    buttonText: "Launch VS Code",
    backgroundColor: "#059669",
    textColor: "#FFFFFF",
    order: 2
  },
  {
    title: "New Conversation",
    description: "Start a fresh conversation with anyone in your network",
    icon: "🚀",
    actionType: "start_conversation",
    requiresAuth: true,
    buttonText: "Start Now",
    backgroundColor: "#DC2626",
    textColor: "#FFFFFF",
    order: 3
  },
  {
    title: "View Profile",
    description: "Manage your profile settings and personal information",
    icon: "👤",
    actionType: "view_profile",
    requiresAuth: true,
    buttonText: "My Profile",
    backgroundColor: "#7C3AED",
    textColor: "#FFFFFF",
    order: 4
  },
  {
    title: "Settings",
    description: "Customize your PingMe experience and preferences",
    icon: "⚙️",
    actionType: "settings",
    requiresAuth: true,
    buttonText: "Open Settings",
    backgroundColor: "#374151",
    textColor: "#FFFFFF",
    order: 5
  },
  {
    title: "Getting Started",
    description: "Learn how to make the most of PingMe's features",
    icon: "📚",
    actionType: "custom",
    requiresAuth: false,
    buttonText: "Learn More",
    backgroundColor: "#F59E0B",
    textColor: "#FFFFFF",
    metadata: {
      redirectUrl: "/getting-started",
      external: false
    },
    order: 6
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    console.log("🔄 Seeding database...");

    // Clear existing cards
    await Card.deleteMany({});
    console.log("🧹 Cleared existing cards");

    // Insert seed cards
    const createdCards = await Card.insertMany(seedCards);
    console.log(`✅ Created ${createdCards.length} cards`);

    console.log("🎉 Database seeded successfully!");
    
    // Display created cards
    console.log("\\nCreated cards:");
    createdCards.forEach((card, index) => {
      console.log(`${index + 1}. ${card.title} (${card.actionType})`);
    });

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close connection
    mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Run the seeding script
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, seedCards };