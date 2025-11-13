import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^[A-Za-z]+ [A-Za-z]+$/.test(v.trim()),
      message: "Full name must include first and last name (e.g., 'John Doe').",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
