const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // تأكد إن اسم ملف المودل صح (user.model.js أو User.js)

exports.authMiddleware = async (req, res, next) => {
  try {
    // 1. استخراج التوكن من الهيدر
    // الشكل المتوقع: "Bearer eyJhbGciOi..."
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. فك تشفير التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. البحث عن اليوزر في الداتابيز (اختياري لكن مفضل)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // 4. إضافة بيانات اليوزر للـ Request عشان الـ Controller يستخدمها
    req.user = user;

    // 5. الانتقال للخطوة اللي بعدها (الـ Controller)
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token expired." });
    }

    res.status(500).json({
      success: false,
      message: "Server error in auth middleware.",
      error: error.message,
    });
  }
};
