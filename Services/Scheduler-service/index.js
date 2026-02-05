const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];

app.post("/tasks", (req, res) => {
  const task = {
    id: `T${tasks.length + 1}`,
    machineId: req.body.machineId,
    status: "SCHEDULED"
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.put("/tasks/:id/complete", (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send("Task not found");

  task.status = "COMPLETED";
  res.json(task);
});

app.listen(3002, () => console.log("Task Service running on 3002"));
