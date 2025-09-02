const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// Get all tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
try {
const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
res.json(tasks);
} catch (err) {
res.status(500).json({ message: "Failed to fetch tasks" });
}
});

// Create new task
router.post("/", authMiddleware, async (req, res) => {
const { title, description } = req.body;
if (!title) return res.status(400).json({ message: "Title is required" });

try {
const task = new Task({
userId: req.user.id,
title,
description,
});
await task.save();
res.status(201).json(task);
} catch (err) {
res.status(500).json({ message: "Failed to create task" });
}
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
try {
const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
if (!task) return res.status(404).json({ message: "Task not found" });
res.json({ message: "Task deleted" });
} catch (err) {
res.status(500).json({ message: "Failed to delete task" });
}
});

// Toggle complete
router.patch("/:id/complete", authMiddleware, async (req, res) => {
try {
const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
if (!task) return res.status(404).json({ message: "Task not found" });

csharp
Copy
Edit
task.completed = !task.completed;
await task.save();
res.json(task);
} catch (err) {
res.status(500).json({ message: "Failed to update task" });
}
});

module.exports = router;