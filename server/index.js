const express = require('express');
const sql = require('mssql');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const routes = require('./src/Routes/routes');

const app = express();
app.use(cors());
app.use(express.json());

// Database configuration
const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'admin@123',
  server: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'bike_assembly_db',
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true
  },
};

// Create a connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL database');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

app.set('poolPromise', poolPromise); // Make poolPromise available globally

// Use routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
