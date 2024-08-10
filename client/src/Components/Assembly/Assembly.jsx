import React, { useState } from 'react';
import { assembleBike } from '../../Services/Service'; // Import the service function
import './Assembly.css';

const AssembleBike = () => {
  const [bikeType, setBikeType] = useState('');
  const [message, setMessage] = useState('');
  const employeeId = 1; // For simplicity, assuming a logged-in employee ID

  const handleAssemble = async (e) => {
    e.preventDefault();
    try {
      const data = await assembleBike(employeeId, bikeType);
      setMessage(data.message);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Assemble Bike</h2>
      <form onSubmit={handleAssemble}>
        <select value={bikeType} onChange={(e) => setBikeType(e.target.value)}>
          <option value="">Select Bike Type</option>
          <option value="Bike 1">Bike 1</option>
          <option value="Bike 2">Bike 2</option>
          <option value="Bike 3">Bike 3</option>
        </select>
        <button type="submit">Assemble</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssembleBike;
