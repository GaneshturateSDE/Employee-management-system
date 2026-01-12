const db = require("../../src/config/db");

exports.applyLeave = (req, res) => {
  const employeeId = req.user.id; // from JWT
  const { reason, fromDate, toDate } = req.body;

  const sql = `
    INSERT INTO leaves (employee_id, reason, from_date, to_date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [employeeId, reason, fromDate, toDate],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Failed to apply leave"
        });
      }

      res.json({
        message: "Leave request submitted successfully"
      });
    }
  );
};

/**
 * HR: Get ALL Leave Requests
 * GET /api/leaves
 */
exports.getLeaves = (req, res) => {
  const sql = `
    SELECT 
      l.id,
      e.name AS employee_name,
      e.email,
      l.reason,
      l.from_date,
      l.to_date,
      l.status
    FROM leaves l
    JOIN employees e ON l.employee_id = e.id
    ORDER BY l.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch leave requests"
      });
    }

    res.json(results);
  });
};

/**
 * EMPLOYEE: Get Own Leave Requests
 * GET /api/leaves/my
 */
exports.getMyLeaves = (req, res) => {
  const employeeId = req.user.id;

  const sql = `
    SELECT 
      id,
      reason,
      from_date,
      to_date,
      status
    FROM leaves
    WHERE employee_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch your leaves"
      });
    }

    res.json(results);
  });
};

/**
 * HR: Approve / Reject Leave
 * PUT /api/leaves/:id
 */
exports.updateLeaveStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = `
    UPDATE leaves
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to update leave status"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Leave request not found"
      });
    }

    res.json({
      message: `Leave ${status} successfully`
    });
  });
};
