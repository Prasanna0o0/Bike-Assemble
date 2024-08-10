import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://localhost:5000/api';

// Utility function to get the token from session storage
const getAuthToken = () => sessionStorage.getItem('token');


export const registerUser = async (userData) => {
    try {
        console.log(userData,'userDatauserDatauserData');
        
      const response = await axios.post(`${BASE_URL}/registerUser`, userData);
      console.log(response,'responseresponseresponseresponse');
      
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
  };

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

// Assemble bike function
export const assembleBike = async (employeeId, bikeType) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${BASE_URL}/assemble`,
      { employeeId, bikeType },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to assemble bike');
  }
};

// Fetch dashboard data
export const fetchDashboardData = async (fromDate, toDate) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { fromDate, toDate }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching dashboard data');
  }
};

// Fetch employee data
export const fetchEmployeeData = async (date) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BASE_URL}/employee-production`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { date }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching employee production data');
  }
};
