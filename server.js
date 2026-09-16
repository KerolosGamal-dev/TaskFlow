const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const groupRoutes = require("./routes/group.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");


const app = express();


app.use(cors());
app.use(express.json());



app.use("/api/groups", groupRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("TaskFlow Backend is running! 🚀");
});


const PORT = process.env.PORT || 5000;


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
