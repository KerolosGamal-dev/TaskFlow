const Group = require("../models/Group");

// 1️⃣ GET - جلب كل الجروبات
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();

    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching groups",
      error: error.message,
    });
  }
};

// 2️⃣ GET - جلب جروب واحد بالـ ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.status(200).json({
      success: true,
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching group",
      error: error.message,
    });
  }
};

// 3️⃣ POST - إضافة جروب جديد
exports.createGroup = async (req, res) => {
  try {
    const { name, color, description, user } = req.body;

    // التحقق من إن الاسم موجود
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a group name",
      });
    }

    const group = await Group.create({
      name,
      color,
      description,
      user,
    });

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating group",
      error: error.message,
    });
  }
};

// 4️⃣ PUT - تعديل جروب
exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // يرجع النسخة المعدّلة
      runValidators: true, // يشغل الـ validation
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Group updated successfully",
      data: group,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating group",
      error: error.message,
    });
  }
};

// 5️⃣ DELETE - حذف جروب
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting group",
      error: error.message,
    });
  }
};
