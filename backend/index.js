const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/employees", require("./src/routes/employeeRoutes"));
app.use("/api/leaves", require("./src/routes/leaveRoutes"));
app.use("/api/attendance", require("./src/routes/attendanceRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
