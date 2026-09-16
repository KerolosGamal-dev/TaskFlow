const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware لحماية الـ APIs
exports.protect = async (req, res, next) => {
  let token;

  // التحقق من وجود التوكن في الـ Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // فك تشفير التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // جلب بيانات اليوزر من الداتابيز
    req.user = await User.findById(decoded.userId).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
