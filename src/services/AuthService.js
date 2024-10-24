// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL del backend

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { username, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data)); // Guardar el token en localStorage
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  register: async (username, password, email) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, { username, password, email });
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user'); // Eliminar el token del almacenamiento local
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user')); // Obtener el usuario actualmente autenticado
  }
};

export default AuthService;

  