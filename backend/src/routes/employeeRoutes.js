const router = require("express").Router();
const auth = require("../../src/middleware/authMiddleware");
const c = require("../../src/controllers/employeeController");

router.get("/", auth, c.getEmployees);
router.post("/", auth, c.addEmployee);
router.put("/:id", auth, c.updateEmployee);

module.exports = router;
