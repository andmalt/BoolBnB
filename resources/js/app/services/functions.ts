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
    const store = JSON.parse(`${localStorage.getItem("isCreate")}`);
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
    const store: number|null = JSON.parse(`${localStorage.getItem("number")}`)
    return store;
}

/**
 * set the messages if trashed or not in sidebar messages
 * 
 * @param boolean 
 */
export const setTrashed = (boolean: boolean) => {
    if (boolean) {
        localStorage.setItem("isTrashed",JSON.stringify(true))
    } else {
        localStorage.setItem("isTrashed",JSON.stringify(false))
    }
}

/**
 * check if messages are trash or not
 * 
 * @returns boolean
 */
export const isTrashed = () => {
    const boolean: boolean|null = JSON.parse(`${localStorage.getItem("isTrashed")}`);
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

export const classNames = (...className:any) => {
    return className.filter(Boolean).join(' ');
} 