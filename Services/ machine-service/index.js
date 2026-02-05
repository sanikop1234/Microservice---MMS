const express = require("express");
const app = express();
app.use(express.json());

const machines = [
  {
    id: "M1",
    name: "CNC Machine",
    lastMaintenance: "2025-01-01",
    intervalDays: 30
  }
];

app.get("/machines/:id", (req, res) => {
  const machine = machines.find(m => m.id === req.params.id);
  if (!machine) return res.status(404).send("Machine not found");

  const nextDue = new Date(machine.lastMaintenance);
  nextDue.setDate(nextDue.getDate() + machine.intervalDays);

  res.json({
    ...machine,
    status: new Date() >= nextDue ? "NEEDS_MAINTENANCE" : "OPERATIONAL",
    nextDueDate: nextDue
  });
});

app.listen(3001, () => console.log("Machine Service running on 3001"));
