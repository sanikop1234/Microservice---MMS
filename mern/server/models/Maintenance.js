import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({

  machine_id: {
    type: Number,
    required: true
  },

  machineName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  task: {
    type: String,
    required: true
  },

  scheduledDate: {
    type: Date,
    required: true
  },

  completedDate: {
    type: Date
  },

  status: {
    type: String,
    enum: ["Scheduled", "In Progress", "Completed"],
    default: "Scheduled"
  }

}, { timestamps: true });

export default mongoose.model("Maintenance", maintenanceSchema);