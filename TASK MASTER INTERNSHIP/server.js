// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log("✅ MongoDB Connected");
app.listen(process.env.PORT || 5000, () => {
console.log(🚀 Server running on port ${process.env.PORT || 5000});
});
})
.catch((err) => console.error("❌ MongoDB connection error:", err));