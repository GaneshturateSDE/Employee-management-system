const db = require("../../src/config/db");

exports.markAttendance = (req, res) => {
  const { id, status,attendanceDate } = req.body;
  console.log(id, status,attendanceDate);
  db.query(
    "INSERT INTO attendance (employee_id,attendance_date,status) VALUES (?, ?, ?)",
    [id, attendanceDate, status],
    (results) => res.json({ message: "Attendance marked" })
  );
};

exports.getAttendance = (req, res) => {
  db.query("SELECT * FROM attendance", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.getAttendanceByDate = (req, res) => {
  const { date } = req.query;

  const sql = `
    SELECT e.id, e.name, a.status
    FROM employees e
    LEFT JOIN attendance a
      ON e.id = a.employee_id
      AND a.attendance_date = ?
    ORDER BY e.name
  `;

  db.query(sql, [date], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

