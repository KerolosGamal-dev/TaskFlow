const Task = require("../models/task.model");

// CREATE
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// READ ALL
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// READ ONE
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: "Invalid task ID"
    });
  }
};

// UPDATE
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// DELETE
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid task ID"
    });
  }
};

// GET TODAY'S TASKS
const getTodayTasks = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      dueDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getTasksByGroup = async (req, res) => {
  try {
    const tasks = await Task.find({
      group: req.params.group
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getStatistics = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const pendingTasks = await Task.countDocuments({
      status: "pending"
    });

    const inProgressTasks = await Task.countDocuments({
      status: "in-progress"
    });

    const completedTasks = await Task.countDocuments({
      status: "completed"
    });

    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const todayTasks = await Task.countDocuments({
      dueDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: startOfDay },
      status: { $ne: "completed" }
    });

    res.status(200).json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
      todayTasks
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const searchTasks = async (req, res) => {
  try {
    const { q } = req.query;

    const tasks = await Task.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTodayTasks,
  getTasksByGroup,
  getStatistics,
  searchTasks
};