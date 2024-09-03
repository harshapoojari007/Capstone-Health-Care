import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8089/api/v1',
});

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.get['Content-Type'] = 'application/json';
Axios.defaults.headers.delete['Content-Type'] = 'application/json';
Axios.defaults.headers.put['Content-Type'] = 'application/json';

// Axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default Axios;