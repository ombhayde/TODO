import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTodos = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/todos?page=${page}&limit=${limit}`);
  return response.data;
};

export const getTodo = async (id) => {
  const response = await axios.get(`${API_URL}/todos/${id}`);
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await axios.post(`${API_URL}/todos`, todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/todos/${id}`);
  return response.data;
};