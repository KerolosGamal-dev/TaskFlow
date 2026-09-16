const express = require("express");
const router = express.Router();
const {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");
const { protect } = require("../middleware/authMiddleware");

// حماية كل الـ Routes دي بالـ Middleware
router.use(protect);

// GET /api/groups - جلب كل الجروبات
router.get("/", getGroups);

// POST /api/groups - إضافة جروب جديد
router.post("/", createGroup);

// PUT /api/groups/:id - تعديل جروب
router.put("/:id", updateGroup);

// DELETE /api/groups/:id - حذف جروب
router.delete("/:id", deleteGroup);

module.exports = router;
