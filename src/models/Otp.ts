import mongoose, { Schema, model, models } from "mongoose";

const OtpSchema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 180 }, // auto-delete in 3 mins
});

// Reuse existing model if compiled
export default models.Otp || model("Otp", OtpSchema);
