import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  auth: {
    username: process.env.NEXT_PUBLIC_API_USER || '',
    password: process.env.NEXT_PUBLIC_API_PASS || '',
  },
});

export default api;
