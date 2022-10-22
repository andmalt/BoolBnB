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