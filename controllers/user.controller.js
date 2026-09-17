
const User = require("../models/user.model");
const Group = require("../models/group.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();


    // Create default groups for the new user
    await Group.create([
        {
            name: "Personal",
            user: newUser._id
        },
        {
            name: "Study",
            user: newUser._id
        },
        {
            name: "Work",
            user: newUser._id
        }
    ]);


    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    });
};



const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.status(200).json({
        message: "Login successful",
        token
    });
};



const getProfile = async (req, res) => {

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        user
    });
};



const updateProfile = async (req, res) => {

    const { name, email } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (name) {
        user.name = name;
    }

    if (email) {
        user.email = email;
    }

    await user.save();

    res.status(200).json({
        message: "Profile updated successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
};



const changePassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            message: "Old password and new password are required"
        });
    }

    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Old password is incorrect"
        });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
        message: "Password changed successfully"
    });
};



module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword
};

