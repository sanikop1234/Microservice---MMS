import mongoose from "mongoose";

const machineSchema = new mongoose.Schema(
  {
    machine_id: {
      type: Number,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    location: {
      type: String,
      required: true
    },

    engineer: {
      type: String,
      required: true,
      trim: true
    },

    // Dashboard → Status column
    healthStatus: {
      type: String,
      enum: ["Healthy", "Caution"],
      required: true
    },

    // Dashboard → Scheduled column
    maintenanceStatus: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Machine", machineSchema);