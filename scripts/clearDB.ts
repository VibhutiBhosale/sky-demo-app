import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sky-demo";

async function clearDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(`🗑 Cleared collection: ${collection.collectionName}`);
    }

    console.log("✅ All collections cleared successfully!");
  } catch (err) {
    console.error("❌ Error clearing database:", err);
  } finally {
    await mongoose.disconnect();
  }
}

clearDatabase();
