// scripts/resetDatabase.js
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sky-demo-app";

async function resetDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB 🚀");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      console.log("⚠️ No collections found — nothing to clear.");
    } else {
      for (const { name } of collections) {
        await db.collection(name).deleteMany({}); // ⭐ delete documents only
        console.log(`🧹 Cleared collection: ${name}`);
      }
      console.log("✨ All collections cleared successfully.");
    }

    await mongoose.disconnect();
    console.log("Connection closed.");
  } catch (err) {
    console.error("❌ Error while clearing collections:", err);
    process.exit(1);
  }
}

resetDatabase();
