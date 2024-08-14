const sql = require("mssql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { decryptRequest } = require("../Auth/middleware");

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const registerUser = async (req, res) => {
  const decryptedData = decryptRequest(req.body.encryptedData);
  console.log(decryptedData);
  const { name, username, password, role } = decryptedData;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const pool = await req.app.get("poolPromise");
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .input("role", sql.VarChar, role)
      .query(
        "INSERT INTO employees (name, username, password,role) VALUES (@name, @username, @password, @role)"
      );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  const decryptedData = decryptRequest(req.body.encryptedData);
  console.log(decryptedData);

  const { username, password } = decryptedData;

  try {
    const pool = await req.app.get("poolPromise");
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM employees WHERE username = @username");

    if (result.recordset.length > 0) {
      const user = result.recordset[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const payload = {
          userId: user.id,
          role: user.role,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
          }, // Include user details
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Employee production controller
const getEmployeeProduction = async (req, res) => {

  const decryptedData = decryptRequest(req.body.encryptedData);
  console.log(decryptedData);
  const { date } = decryptedData;

  try {
    const pool = await req.app.get("poolPromise");
    const result = await pool
      .request()
      .input("date", sql.Date, date)
      .query(
        "SELECT e.name, COUNT(a.id) AS count FROM assemblies a JOIN employees e ON a.employee_id = e.id WHERE a.assembly_date = @date GROUP BY e.name"
      );

    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  login,
  getEmployeeProduction,
  registerUser,
};
