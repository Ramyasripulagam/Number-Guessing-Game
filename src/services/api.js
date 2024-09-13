import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Base URL for your backend API

// Register User
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data; // Return the response data or handle it as needed
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Login User
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Return the response data or handle it as needed
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Get Highscore
export const getHighscore = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/highscore/${username}`);
    return response.data; // Return the response data or handle it as needed
  } catch (error) {
    console.error('Error fetching highscore:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Update Highscore
export const updateHighscore = async (username, highscore) => {
  try {
    const response = await axios.post(`${API_URL}/highscore/${username}`, { highscore });
    return response.data; // Return the response data or handle it as needed
  } catch (error) {
    console.error('Error updating highscore:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
