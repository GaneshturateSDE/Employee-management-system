const router = require("express").Router();
const { login } = require("../../src/controllers/authController");

router.post("/login", login);
module.exports = router;
