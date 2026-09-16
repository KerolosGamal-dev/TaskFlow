const Group = require("../models/Group");


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


exports.createGroup = async (req, res) => {
  try {
    const { name, color } = req.body;

    const group = new Group({
      name,
      color,
      user: req.user._id,
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


exports.updateGroup = async (req, res) => {
  try {
    const { name, color } = req.body;

    const group = await Group.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
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


exports.createDefaultGroups = async (userId) => {
  const defaultGroups = [
    { name: 'Personal', color: '#3498db', user: userId },
    { name: 'Study', color: '#2ecc71', user: userId },
    { name: 'Work', color: '#e74c3c', user: userId },
  ];

  await Group.insertMany(defaultGroups);
};
