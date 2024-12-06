// src/services/formService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/forms';  // Adjust based on your backend

export const createForm = async (formData) => {
  const response = await axios.post(`${API_URL}/create`, formData);
  return response.data;
};

export const submitResponse = async (formId, answers) => {
  const response = await axios.post(`${API_URL}/submit`, { formId, answers });
  return response.data;
};

export const getFormById = async (formId) => {
  const response = await axios.get(`${API_URL}/${formId}`);
  return response.data;
};
