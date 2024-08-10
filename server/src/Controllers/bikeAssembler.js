const sql = require("mssql");
const jwt = require("jsonwebtoken");


// Sample bike assembly times
const bikeTimes = {
  "Bike 1": "00:50:00",
  "Bike 2": "01:00:00",
  "Bike 3": "01:20:00",
};

// Bike assembly controller
const assembleBike = async (req, res) => {
  const { employeeId, bikeType } = req.body;
  const assemblyTimeString = bikeTimes[bikeType];

  try {
    const isValidTime = /^\d{2}:\d{2}:\d{2}$/.test(assemblyTimeString);

    if (!isValidTime) {
      return res
        .status(400)
        .json({ message: "Invalid time format for assemblyTime" });
    }

    const pool = await req.app.get("poolPromise");
    await pool
      .request()
      .input("employeeId", sql.Int, employeeId)
      .input("bikeType", sql.VarChar, bikeType)
      .input("assemblyTime", sql.VarChar, assemblyTimeString)
      .query(
        "INSERT INTO assemblies (employee_id, bike_type, assembly_time, assembly_date) VALUES (@employeeId, @bikeType, @assemblyTime, CAST(GETDATE() AS DATE))"
      );

    res.json({ message: "Bike assembled successfully!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  assembleBike,
};
