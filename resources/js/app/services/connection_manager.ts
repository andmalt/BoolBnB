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
            const response = await axios.post(`${BASE_URL}/api/login`, data);
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
            const response = await axios.post(`${BASE_URL}/api/register`, data)
            if (response.data.success) {
                setLocalStorage(response)
            }
            return response;
        } catch (e) {
            return { data: { success: false, errors: e } }
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
    },
    getAllHouses: async function () {
        const headers = {
            "Content-Type": "application/json",
        }
        try {
            const response = await axios.get(`${BASE_URL}/api/homes`, { headers })
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e }}}
        }
    },
    getHome: async function(id:string|undefined){
        const headers = {
            "Content-Type": "application/json",
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/house/${id}`,{},{ headers })
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e }}}
        }
    },
    guestSendEmail: async function (
        name: string,
        surname: string,
        email: string,
        message: string,
        houseId: number|undefined
    ) {
        const headers = {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        const data = {
            name: convertInputForm(name),
            surname: convertInputForm(surname),
            email,
            message_content:message,
            houseId
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/message/send`,data, { headers })
            return response; 
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e }}}
        }
    },
    getAllMyHouses: async function (token:string|null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartments`,{},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    paginateMyHM: async function (token:string|null,link:string) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(link,{},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getMyHome: async function (token:string|null,id:number|null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/${id}`,{},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getFacReg: async function (token:string|null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartments/recfac`,{},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    createMyHome: async function(token:string|null,data:any){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/create`, data ,{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    updateMyHome: async function(token:string|null,id:number|null,data:any){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.patch(`${BASE_URL}/api/my/apartment/${id}/update`, data ,{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    deleteMyHome: async function(token:string|null,id:number|null){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.delete(`${BASE_URL}/api/my/apartment/${id}/delete`,{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    updatePhotos: async function(token:string|null,id:number|null,data:any){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/${id}/img/upload`, data ,{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    deletePhotos: async function(token:string|null,id:number|null){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.delete(`${BASE_URL}/api/my/apartment/img/${id}/delete`,{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getAllMyMessages: async function (token:string|null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/messages`, {},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getAllMyTrashedMessages: async function (token:string|null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/messages/trashed`, {},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getMyMessage: async function (token:string|null, id:number|null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/message/${id}`,{},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    restoreMyMessage: async function (token:string|null, id:number|null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.patch(`${BASE_URL}/api/my/message/${id}/restore`,{},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    deleteMyMessage: async function(token:string|null,id:number|null){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.delete(`${BASE_URL}/api/my/message/${id}/delete`,{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    destroyMyMessage: async function(token:string|null,id:number|null){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.delete(`${BASE_URL}/api/my/message/${id}/destroy`,{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getSponsorships:async function (token:string|null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/sponsorships`,{},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    updateSponsorshipToTheHouse: async function(token:string|null,id:number|null,data:any){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/${id}/sponsorship/update`,data,{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    generateToken:async function(token:string|null){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/generate/token`,{},{ headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    makePayment:async function(token:string|null,data:any){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/make/payment`, data, { headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getTotalVisits:async function(token:string|null,id: number){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/${id}/stat/total`, {}, { headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getYearVisits:async function(token:string|null,id: number){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/${id}/stat/year`, {}, { headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getMonthVisits:async function(token:string|null,id: number){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/${id}/stat/month`, {}, { headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getWeekVisits:async function(token:string|null,id: number){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/${id}/stat/week`, {}, { headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
    getTodayVisits:async function(token:string|null,id: number){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/my/apartment/${id}/stat/day`, {}, { headers });
            return response;
        } catch (e) {
            return { data: { success: false, error: { code: 500, message: e } } }
        }
    },
}

export default api;