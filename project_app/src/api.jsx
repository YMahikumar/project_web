import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend server URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Timeout in milliseconds
});

export const registerStudent = async (formData) => {
  try {
    const response = await axiosInstance.post('/register', formData);
    return response.data;
  } catch (error) {
    throw error.response.data.msg || 'Server error';
  }
};

export const loginStudent = async (loginData) => {
  try {
    const response = await axiosInstance.post('/login', loginData);
    return response.data;
  } catch (error) {
    throw error.response.data.msg || 'Server error';
  }
};

// Add more API functions as needed (e.g., updateStudent, deleteStudent)

export default axiosInstance;
