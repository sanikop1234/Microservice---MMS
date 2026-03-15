import express from "express";
import Machine from "../models/Machine.js";
import Maintenance from "../models/Maintenance.js";

const router = express.Router();

/* CREATE MACHINE */
router.post("/", async (req, res) => {
  try {
    const {
      machine_id,
      name,
      location,
      engineer,
      healthStatus,
      maintenanceStatus,
    } = req.body;

    // HARD VALIDATION
    if (
      !machine_id ||
      !name ||
      !location ||
      !engineer ||
      !healthStatus ||
      !maintenanceStatus
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const machine = await Machine.create({
      machine_id,
      name,
      location,
      engineer,
      healthStatus,
      maintenanceStatus,
    });

    res.status(201).json(machine);
  } catch (err) {
    console.error("Create machine error:", err);

    // Duplicate machine id or name
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Machine already exists",
      });
    }

    res.status(500).json({
      message: "Failed to save machine",
    });
  }
});

/* GET ALL MACHINES */
router.get("/", async (req, res) => {
  const machines = await Machine.find().sort({ createdAt: -1 });
  res.json(machines);
});

export default router;