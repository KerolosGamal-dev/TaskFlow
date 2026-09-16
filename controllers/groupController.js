const Group = require("../models/Group");

// 1️ GET - جلب كل الجروبات بتاعة اليوزر
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ user: req.user._id });

    res.json({
      message: "Groups fetched successfully",
      count: groups.length,
      groups,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2️⃣ POST - إضافة جروب جديد
exports.createGroup = async (req, res) => {
  try {
    const { name, color } = req.body;

    const group = new Group({
      name,
      color,
      user: req.user._id, // الجروب هيتربط باليوزر اللي عاملة
    });

    await group.save();

    res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3️⃣ PUT - تعديل جروب موجود
exports.updateGroup = async (req, res) => {
  try {
    const { name, color } = req.body;

    const group = await Group.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // تأكد إن الجروب بتاع اليوزر ده
      { name, color },
      { new: true, runValidators: true },
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({
      message: "Group updated successfully",
      group,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 4️⃣ DELETE - حذف جروب
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({
      message: "Group deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 5️ Auto-create Default Groups (لما اليوزر يسجل لأول مرة)
exports.createDefaultGroups = async (userId) => {
  const defaultGroups = [
    { name: 'Personal', color: '#3498db', user: userId },
    { name: 'Study', color: '#2ecc71', user: userId },
    { name: 'Work', color: '#e74c3c', user: userId },
  ];

  await Group.insertMany(defaultGroups);
};
