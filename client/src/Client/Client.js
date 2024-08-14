import axios from 'axios';
import { encryptRequest } from './Crypto';

// Base URL for API
const BASE_URL = 'http://localhost:5000/api';

// Utility function to get the token from session storage
const getAuthToken = () => sessionStorage.getItem('token');

// Reusable client function
const client = async (endpoint, { method = 'GET', data, params } = {}) => {
  const token = getAuthToken();
  const encryptedData = encryptRequest(data);


  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      data:{encryptedData},
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};


export default client;
