const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/group.controller");


router.use(authMiddleware);


router.get("/", getGroups);

router.get("/:id", getGroupById);

router.post("/", createGroup);

router.put("/:id", updateGroup);

router.delete("/:id", deleteGroup);


module.exports = router;
