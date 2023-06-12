import { AxiosResponse } from "axios"


export const setLocalStorage = (response: AxiosResponse<any>) => {
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("name", response.data.user.name)
    localStorage.setItem("surname", response.data.user.surname)
    localStorage.setItem("email", response.data.user.email)
    localStorage.setItem("userSince", response.data.user.created_at)
}

export const getLocalStorage = () => {
    const token = String(localStorage.getItem("token"))
    const name = String(localStorage.getItem("name"))
    const surname = String(localStorage.getItem("surname"))
    const email = String(localStorage.getItem("email"))
    const userSince = String(localStorage.getItem("userSince"))

    return { token, name, surname, email, userSince }
}

export const deleteLocalStorage = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("surname")
    localStorage.removeItem("userSince")
    localStorage.removeItem("email")
    localStorage.removeItem("dashboard")
    localStorage.removeItem("number")
    localStorage.removeItem("isCreate")
    localStorage.removeItem("isTrashed")
    localStorage.removeItem("readMessagesLength")
    localStorage.removeItem("isVerificatedTheEmail")
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
 * set in the storage the name of the variable for displaying a view in the dashboard
 */
export const setDashboardComponents = (e:string) => {
    localStorage.setItem("dashboard", e);
}

/**
 * return variable name for displaying a view in the dashboard
 */
export const getDashboardComponents = () => {
    const store = localStorage.getItem("dashboard");
    return store;
}
export const getIsCreate = () => {
    const store = JSON.parse(String(localStorage.getItem("isCreate")));
    return store;
}
export const setIsCreate = (item:boolean) => {
    const store = localStorage.setItem("isCreate",JSON.stringify(item));
    return store;
}

/**
 * This function saves a house id number in the storage
 * 
 * @param number id House
 */
export const setIdNumber = (number:number|null) => {
    localStorage.setItem("number", JSON.stringify(number));
}

export const getNumber = () => {
    const store: number|null = JSON.parse(String(localStorage.getItem("number")))
    return store;
}

/**
 * set the messages if trashed or not in sidebar messages
 * 
 * @param boolean 
 */
export const setTrashed = (boolean: boolean) => {
    localStorage.setItem("isTrashed",JSON.stringify(boolean))
}

/**
 * check if messages are trash or not
 * 
 * @returns boolean
 */
export const isTrashed = () => {
    const boolean: boolean|null = JSON.parse(String(localStorage.getItem("isTrashed")));
    if (boolean) {
        return true
    }
    return false
}

/**
 * 
 * @param number 
 */
export const setLengthMessagesRead = (number:number) => {
    localStorage.setItem('readMessagesLength', JSON.stringify(number));
}

/**
 * 
 * @returns 
 */
export const getLengthMessagesRead = () => {
    const length = localStorage.getItem('readMessagesLength')
    const response: number | null = JSON.parse(length!)
    if (!response) {
        return 0
    }
    return response;
}

export const setEmailVerification = (boolean:boolean) => {
    localStorage.setItem("isVerificatedTheEmail",JSON.stringify(boolean))
}
export const getEmailVerification = () => {
    const boolean: boolean|null = JSON.parse(String(localStorage.getItem("isVerificatedTheEmail")))
    if (!boolean) {
        return false;
    }
    return true;
}

export const classNames = (...className:any) => {
    return className.filter(Boolean).join(' ');
} 