import axios from "axios"

const BASE_URL: string = `http://localhost:8000`;

const api = {
    csrfCookie: async function () {
        try {
            const response = await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    login: async function (email: string, password: string) {
        try {
            const data = {
                email,
                password
            }
            const response = await axios.post(`${BASE_URL}/api/login`, data);
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    register: async function (name: string, surname: string, email: string, password: string, password_confirmation: string) {

        const data = {
            name,
            surname,
            email,
            password,
            password_confirmation
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/register`, data);
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    logout: async function (token: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        try {
            const response = await axios.delete(`${BASE_URL}/api/logout`, { headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    }
}

export default api;