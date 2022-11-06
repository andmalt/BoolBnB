import axios from "axios"
import { convertInputForm, deleteLocalStorage, setLocalStorage } from "./functions";

const BASE_URL: string = `http://localhost:8000`;

const csrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const api = {
    login: async function (email: string, password: string) {
        try {
            const data = {
                email,
                password
            }
            const response = await axios.post(`${BASE_URL}/api/login`, data, {
                headers: {
                    'X-CSRF-TOKEN': `${csrf}`,
                }
            });
            if (response.data.success) {
                setLocalStorage(response)
            }
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    register: async function (
        name: string,
        surname: string,
        email: string,
        password: string,
        passwordConfirmation: string) {

        const data = {
            name: convertInputForm(name),
            surname: convertInputForm(surname),
            email,
            password,
            password_confirmation: passwordConfirmation
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/register`, data, {
                headers: {
                    'X-CSRF-TOKEN': `${csrf}`
                }
            });
            if (response.data.success) {
                setLocalStorage(response)
            }
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    logout: async function (token: string | null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            await axios.delete(`${BASE_URL}/api/logout`, { headers });
            return deleteLocalStorage();
        } catch (e) {
            deleteLocalStorage()
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    }
}

export default api;