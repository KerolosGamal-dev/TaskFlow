const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createDefaultGroups } = require("./groupController"); // <-- السطر ده جديد

// Register - تسجيل حساب جديد
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // التحقق من إن اليوزر مش موجود قبل كده
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // إنشاء يوزر جديد
    const user = new User({ name, email, password });
    await user.save();

    //  إنشاء الجروبات الافتراضية أوتوماتيك (Personal, Study, Work)
    await createDefaultGroups(user._id); // <-- السطر ده جديد

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login - تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // البحث عن اليوزر
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // التحقق من الباسورد
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // إنشاء JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
