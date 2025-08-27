import axios from 'axios';

const API = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    }
);

export const getAllStudents = async () => {
    try {
        const res = await API.get('/students');
        return res.data.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}

export const getStudentById = async (id) => {
    try {
        const res = await API.get(`/students/${id}`)
        return res.data.data;
    } catch (error) {
        console.error(`Error fetching student with ID ${id}:`, error);
        throw error;
    }
}

export const createStudent = async (studentData) => {
    try {
        const res = await API.post('/students', studentData);
        return res.data.data;
    } catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
}

export const updateStudent = async (id, studentData) => {
    try {
        const res = await API.put(`/students/${id}`, studentData);
        return res.data.data;
    } catch (error) {
        console.error(`Error updating student with ID ${id}:`, error);
        throw error;
    }
}

export const deleteStudent = async (id) => {
    try {
        const res = await API.delete(`/students/${id}`);
        return res.data.data;
    } catch (error) {
        console.error(`Error deleting student with ID ${id}:`, error);
        throw error;
    }
}