import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    image: { type: String },      // ⭐ ADD THIS
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
