const router = require("express").Router();
const auth = require("../../src/middleware/authMiddleware");
const c = require("../../src/controllers/attendanceController");

router.post("/", auth, c.markAttendance);
router.get("/", auth, c.getAttendanceByDate);

module.exports = router;
