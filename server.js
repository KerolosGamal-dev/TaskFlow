const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 1. استدعاء كل الـ Routes
const authRoutes = require("./routes/authRoutes");
const authRoutes = require("./ro/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const taskRoutes = require("./routes/task.routes"); // تأكد إن اسم الفولدر routes صغير زي ما هو مكتوب هنا

// 2. إعداد تطبيق Express
const app = express();

// 3. الـ Middlewares
app.use(cors());
app.use(express.json());

// 4. تعريف الـ Routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/tasks", taskRoutes);

// 5. Route تجريبي للتأكد إن السيرفر شغال
app.get("/", (req, res) => {
  res.send("TaskFlow Backend is running! 🚀");
});

// 6. الاتصال بقاعدة البيانات وتشغيل السيرفر
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    // تشغيل السيرفر فقط بعد نجاح الاتصال بالداتابيز
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
