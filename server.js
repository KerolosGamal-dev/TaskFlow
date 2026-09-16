const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes

const groupRoutes = require("./routes/groupRoutes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/groups", groupRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("TaskFlow Backend is running! 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
