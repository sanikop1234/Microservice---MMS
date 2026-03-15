import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// ===============================
// ADMIN LOGIN ROUTE
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const usersCollection = await db.collection("users");

    // Find admin user
    const admin = await usersCollection.findOne({
      email,
      role: "ADMIN",
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ⚠️ Plain password for now (hash later)
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Login success
    res.status(200).json({
      message: "Login successful",
      adminId: admin._id,
      role: admin.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
