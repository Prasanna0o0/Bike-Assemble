import React, { useState } from 'react';
import { assembleBike } from '../../Services/Service'; // Import the service function
import './Assembly.css';

// AssembleBike component
const AssembleBike = () => {

  //Store selected bike type and message
  const [bikeType, setBikeType] = useState('');
  const [message, setMessage] = useState('');

  // Fetch user from session 
  const user = sessionStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;
  

  // Handle form submission to assemble a bike
  const handleAssemble = async (e) => {
    e.preventDefault();
    try {
      const data = await assembleBike(parsedUser.id, bikeType);
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
