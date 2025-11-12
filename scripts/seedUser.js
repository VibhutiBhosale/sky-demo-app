// scripts/seedUser.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sky-demo-app";

async function seedUser() {
  await mongoose.connect(uri);

  const hashed = await bcrypt.hash("123456", 10);
  await mongoose.connection.db.collection("users").insertOne({
    email: "test@example.com",
    password: hashed,
    name: "Test User",
  });

  console.log("✅ Seeded user: test@example.com / Pass1234");
  await mongoose.disconnect();
}

seedUser();
