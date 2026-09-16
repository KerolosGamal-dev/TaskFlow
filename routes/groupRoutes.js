const express = require("express");
const router = express.Router();
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");

// تعريف الـ Routes
router.get("/", getGroups); // GET /api/groups
router.get("/:id", getGroupById); // GET /api/groups/123
router.post("/", createGroup); // POST /api/groups
router.put("/:id", updateGroup); // PUT /api/groups/123
router.delete("/:id", deleteGroup); // DELETE /api/groups/123

module.exports = router;
