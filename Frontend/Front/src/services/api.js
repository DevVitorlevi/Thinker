
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // ou o IP real se estiver em rede
});

export default api;
