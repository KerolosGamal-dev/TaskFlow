const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByGroup,
  getStatistics,
} = require("../controllers/task.controller");


const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();


router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/group/:groupId", getTasksByGroup);
router.get("/statistics", getStatistics);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
