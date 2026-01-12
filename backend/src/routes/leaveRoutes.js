const router = require("express").Router();
const auth = require("../../src/middleware/authMiddleware");
const controller = require("../../src/controllers/leaveController");

// Employee
router.post("/", auth, controller.applyLeave);
router.get("/my", auth, controller.getMyLeaves);

// HR
router.get("/", auth, controller.getLeaves);
router.put("/:id", auth, controller.updateLeaveStatus);

module.exports = router;
