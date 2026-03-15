import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/connection.js";
import authRoutes from "./routes/auth.js";
import recordRoutes from "./routes/record.js";
import maintenanceRoutes from "./routes/Maintenance.js";
import machineRoutes from "./routes/Machine.js";

dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5050;

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB */
connectDB();

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/record", recordRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/machines", machineRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
