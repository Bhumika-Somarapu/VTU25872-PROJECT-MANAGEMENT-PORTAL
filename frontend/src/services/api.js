import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const taskService = {
    getTasks: async () => {
        try {
            const response = await api.get('/tasks');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createTask: async (taskData) => {
        try {
            const response = await api.post('/tasks', taskData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateTaskStatus: async (id, status) => {
        try {
            const response = await api.put(`/tasks/${id}`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteTask: async (id) => {
        try {
            const response = await api.delete(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};