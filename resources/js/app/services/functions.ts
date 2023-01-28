import { AxiosResponse } from "axios"


export const setLocalStorage = (response: AxiosResponse<any>) => {
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("name", `${response.data.user.name} ${response.data.user.surname}`)
    localStorage.setItem("email", response.data.user.email)
}

export const getLocalStorage = () => {
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")

    return { token, name, email }
}

export const deleteLocalStorage = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
}

/**
 * a string will be made lowercase except the first letter
 * 
 * @param e string 
 * @returns string
 */
export const convertInputForm = (e: string) => {
    let ordered = e.trim();
    let lowerCase = ordered.toLowerCase();
    const response = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
    return response;
}

/**
 * 
 */
export const setDashboardComponents = (e:string) => {
    localStorage.setItem("Dashboard", e);
}

/**
 * 
 */
export const getDashboardComponents = () => {
    const store = localStorage.getItem("Dashboard");
    return store;
}