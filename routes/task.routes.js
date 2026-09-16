const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTodayTasks,
  getTasksByGroup,
  getStatistics,
  searchTasks
} = require("../controllers/task.controller");

const router = express.Router();

router.post("/", createTask);

router.get("/", getTasks);
router.get("/today", getTodayTasks);
router.get("/group/:group", getTasksByGroup);
router.get("/statistics", getStatistics);
router.get("/search", searchTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;