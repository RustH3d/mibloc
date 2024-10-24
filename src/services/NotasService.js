// src/services/NotasService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // URL del backend

const NotasService = {
  getAllNotes: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`${API_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${user?.token}` // Usar el token para autenticación
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  createNote: async (note) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(`${API_URL}/notes`, note, {
        headers: {
          Authorization: `Bearer ${user?.token}` // Usar el token para autenticación
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  updateNote: async (noteId, note) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.put(`${API_URL}/notes/${noteId}`, note, {
        headers: {
          Authorization: `Bearer ${user?.token}` // Usar el token para autenticación
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (noteId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.delete(`${API_URL}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}` // Usar el token para autenticación
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
};

export default NotasService;
