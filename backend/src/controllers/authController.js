const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../../src/config/jwt");
const db = require("../../src/config/db");

exports.login = (req, res) => {
  const { username, password } = req.body;
  
   db.query(
    "SELECT * FROM employees WHERE email = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ username, id: results[0].id }, secret, { expiresIn });
     return  res.json({ token,  role: results[0].role});
    }
  );

   

  // return res.status(401).json({ message: "Invalid credentials" });
};
