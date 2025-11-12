// scripts/resetDatabase.js
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/your-db-name";

async function resetDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB ✅");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      console.log("⚠️ No collections found — nothing to clear.");
    } else {
      for (const { name } of collections) {
        await db.dropCollection(name);
        console.log(`🗑️ Dropped collection: ${name}`);
      }
      console.log("✨ All collections dropped successfully.");
    }

    await mongoose.disconnect();
    console.log("Connection closed.");
  } catch (err) {
    console.error("❌ Error while dropping collections:", err);
    process.exit(1);
  }
}

resetDatabase();
