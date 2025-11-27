import mongoose, { Schema, model, models } from "mongoose";

const CookieCategorySchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    required: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.CookieCategory || model("CookieCategory", CookieCategorySchema);
