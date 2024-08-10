import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { fetchDashboardData, fetchEmployeeData } from "../../Services/Service";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleEmployeeProduction = (selectedDate) => {
    setDate(selectedDate);
    fetchEmployeeData(selectedDate).then(data => setEmployeeData(data)).catch(err => console.error(err));
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchDashboardData(fromDate, toDate).then(data => setDashboardData(data)).catch(err => console.error(err));
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    if (date) {
      fetchEmployeeData(date).then(data => setEmployeeData(data)).catch(err => console.error(err));
    }
  }, [date]);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Filter Assembled Bikes</h3>
      <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      <button onClick={() => fetchDashboardData(fromDate, toDate).then(data => setDashboardData(data)).catch(err => console.error(err))}>Filter</button>

      <h3>Number of Bikes Assembled</h3>
      <BarChart width={600} height={300} data={dashboardData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bike_type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      <h3>Employee Production</h3>
      <input type="date" value={date} onChange={(e) => handleEmployeeProduction(e.target.value)} />
      <BarChart width={600} height={300} data={employeeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default AdminDashboard;
