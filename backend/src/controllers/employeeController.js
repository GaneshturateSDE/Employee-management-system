const db = require("../../src/config/db");

exports.getEmployees = (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) throw err;
    res.json(result||{message:"No employees found"});
  });
};

exports.addEmployee = (req, res) => {
  const { name, email, role } = req.body;
  const password=name+"@123"; 
  db.query(
    "INSERT INTO employees (name, email, role, password) VALUES (?, ?, ?, ?)",
    [name, email, role, password],
    () => res.json({ message: "Employee added" })
  );
};

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  db.query(
    "UPDATE employees SET name=?, email=?, role=? WHERE id=?",
    [name, email, role, id],
    () => res.json({ message: "Employee updated" })
  );
};
