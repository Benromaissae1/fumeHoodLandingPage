import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchFeatures = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/features`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching features:', error);
    return [];
  }
};

export const submitContact = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to submit form' };
  }
};
