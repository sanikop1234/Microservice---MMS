import express from "express";
import Maintenance from "../models/Maintenance.js";
import Machine from "../models/Machine.js";

const router = express.Router();

/* ===============================
   Schedule new maintenance task
================================ */

router.post("/", async (req, res) => {

  try {

    const {
      machine_id,
      machineName,
      task,
      scheduledDate
    } = req.body;

    if (!machine_id || !machineName || !task || !scheduledDate) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }

    const taskData = await Maintenance.create({

      machine_id: machine_id,
      machineName: machineName.trim().toLowerCase(),
      task: task,
      scheduledDate: scheduledDate,
      status: "Scheduled"

    });

    /* Update machine status */

    await Machine.findOneAndUpdate(

      { name: new RegExp(`^${machineName}$`, "i") },

      {
        healthStatus: "Caution",
        maintenanceStatus: "Scheduled",
        lastUpdated: new Date(),
      },

      { returnDocument: "after" }

    );

    res.status(201).json(taskData);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to schedule task"
    });

  }

});


/* ===============================
   Get upcoming tasks
================================ */

router.get("/upcoming", async (req, res) => {

  try {

    const tasks = await Maintenance.find({

      status: { $ne: "Completed" }

    }).sort({ scheduledDate: 1 });

    res.json(tasks);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch tasks"
    });

  }

});


/* ===============================
   Get completed tasks
================================ */

router.get("/completed", async (req, res) => {

  try {

    const tasks = await Maintenance.find({

      status: "Completed"

    }).sort({ completedDate: -1 });

    res.json(tasks);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch completed tasks"
    });

  }

});


/* ===============================
   Update task status
================================ */

router.patch("/:id", async (req, res) => {

  try {

    const { status } = req.body;

    let updateData = { status };

    /* Save completion time */

    if (status === "Completed") {

      updateData.completedDate = new Date();

    }

    const task = await Maintenance.findByIdAndUpdate(

      req.params.id,
      updateData,
      { returnDocument: "after" }

    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    const now = new Date();

    /* Check other active tasks */

    const activeTasks = await Maintenance.find({

      machineName: task.machineName,
      status: { $ne: "Completed" }

    });

    const hasInProgress = activeTasks.some(
      (t) => t.status === "In Progress"
    );

    const hasScheduled = activeTasks.some(
      (t) => t.status === "Scheduled"
    );

    let healthStatus = "Healthy";
    let maintenanceStatus = "Completed";

    if (hasInProgress) {

      healthStatus = "Caution";
      maintenanceStatus = "In Progress";

    }
    else if (hasScheduled) {

      healthStatus = "Caution";
      maintenanceStatus = "Scheduled";

    }

    /* Update machine */

    await Machine.findOneAndUpdate(

      { name: new RegExp(`^${task.machineName}$`, "i") },

      {
        healthStatus,
        maintenanceStatus,
        lastUpdated: now,
      },

      { returnDocument: "after" }

    );

    res.json({
      message: "Task updated successfully",
      task
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to update task"
    });

  }

});

export default router;