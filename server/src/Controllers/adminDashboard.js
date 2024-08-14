const sql = require("mssql");
const jwt = require("jsonwebtoken");
const { decryptRequest,encryptResponse } = require("../Auth/Crypto");

// Admin dashboard controller
const getDashboard = async (req, res) => {
  const decryptedData = decryptRequest(req.body.encryptedData);
  console.log(decryptedData);
  const { fromDate, toDate } = decryptedData;

  try {
    const pool = await req.app.get("poolPromise");
    const result = await pool
      .request()
      .input("fromDate", sql.Date, fromDate)
      .input("toDate", sql.Date, toDate)
      .query(
        "SELECT bike_type, COUNT(*) AS count FROM assemblies WHERE assembly_date BETWEEN @fromDate AND @toDate GROUP BY bike_type"
      );
      
      const encryptedData = encryptResponse(result.recordset);
    res.json(encryptedData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getDashboard,
};
