import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config({ path: "./config.env" });

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: "admin@test.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    email: "admin@test.com",
    password: hashedPassword,
    role: "ADMIN",
  });

  console.log("✅ Admin user created");
  process.exit();
}

createAdmin();
