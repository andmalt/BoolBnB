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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status: e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
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
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
        }
    },
    emailResend:async function(token:string|null){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/email/verify/resend`, {},{ headers });
            return response;
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
        }
    },
    emailVerification:async function(token:string|null){
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': `${csrf}`
        }
        try {
            const response = await axios.post(`${BASE_URL}/api/email/verification`, {},{ headers });
            return response;
        } catch (e:any) {
            return { data: { success: false, error: { code: 500, message: e } }, status:e.response.status }
        }
    },
}

export default api;