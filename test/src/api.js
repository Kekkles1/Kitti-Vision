import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your backend server URL
  timeout: 5000, // Adjust as needed
});
export default instance;