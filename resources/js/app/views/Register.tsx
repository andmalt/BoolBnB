import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/connection_manager';
import { authenticated, clear, error, loading } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';
import { toast } from 'react-toastify';

type Form = {
    name: string[],
    surname: string[],
    email: string[],
    password: string[],
    password2: string[]
}

const Register = () => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [show, setShow] = useState<boolean>(true);
    const [show2, setShow2] = useState<boolean>(true);
    const [errors, setErrors] = useState<Form>();
    const [isError, setIsError] = useState<boolean>();
    const [noRegister, setNoRegister] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const register = async (e: any) => {
        e.preventDefault()
        dispatch(loading());
        if (password !== password2 || (password === "" && password2 === "")) {
            // creare modale di password non corrette
            setNoRegister(true)
            dispatch(clear())
            return console.log("password errata");
        }
        setNoRegister(false)
        try {
            const response = await api.register(name, surname, email, password, password2);
            if (response.data.success) {
                dispatch(authenticated(response.data.token))
                setName("")
                setSurname("")
                setEmail("")
                setPassword("")
                setPassword2("")
                dispatch(clear())
                // console.log("store token: " + authSelector.token);
                toast.success("Ti sei registrato correttamente!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                return navigate("/dashboard");
            }
            // setIsError(true)
            // console.log(isError);
            // setErrors(response.data.errors.response.data.errors)
            console.log("register failed");
            dispatch(clear())
            toast.error("La registrazione non è andata a buon fine!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } catch (e) {
            /* dispatch(error()) */
            console.log("register error: ", e);
            return null
        }
    }

    return (
        <div className="container max-w-full mx-auto pb-24 pt-12 px-6">
            <div className="font-sans">
                <div className="max-w-sm mx-auto px-6">
                    <div className="relative flex flex-wrap">
                        <div className="w-full relative">
                            <div>
                                <div className="text-center font-bold text-white text-[25px] mb-10">
                                    Registrati su BoolBnB
                                </div>

                                <form >
                                    <div className='mx-auto max-w-lg text-white'>
                                        <div className="py-2">
                                            <span className="px-1 text-smfont-bold">Nome</span>
                                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="" type="text"
                                                className="text-md block px-3 py-2 mt-2 rounded-lg w-full bg-[#1d2432] border-2  placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:border-[#6366f1]  focus:outline-none mb-2" />
                                        </div>
                                        <div className="py-2">
                                            <span className="px-1 text-sm font-bold">Cognome</span>
                                            <input value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="" type="text"
                                                className="text-md block px-3 py-2 mt-2 rounded-lg w-full bg-[#1d2432] border-2  placeholder-gray-600 shadow-md focus:placeholder-gray-500  focus:border-[#6366f1]  focus:outline-none mb-2" />
                                        </div>
                                        <div className="py-2">
                                            <span className="px-1 text-sm font-bold">Email</span>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" type="email"
                                                className={"text-md block px-3 py-2 mt-2 rounded-lg w-full bg-[#1d2432] border-2  placeholder-gray-600 shadow-md focus:placeholder-gray-500  focus:border-[#6366f1]  focus:outline-none mb-2"} />
                                        </div>
                                        <div className="py-2">
                                            <span className="px-1 text-sm font-bold">Password</span>
                                            <div className="relative">
                                                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" type={show ? 'password' : 'text'}
                                                    className={`${noRegister ? "border-red-600 " : null}` + "text-md block px-3 mt-2 py-2 rounded-lg w-full bg-[#1d2432] border-2 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:border-[#6366f1]  focus:outline-none"} />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                                    {
                                                        !show ?
                                                            <svg onClick={() => setShow(true)} className="h-6 text-white" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                                <path fill="currentColor"
                                                                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                                                </path>
                                                            </svg>
                                                            :
                                                            <svg onClick={() => setShow(false)} className="h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                                <path fill="currentColor"
                                                                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                                                </path>
                                                            </svg>

                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <span className="px-1 text-sm font-bold">Password di conferma</span>
                                            <div className="relative">
                                                <input value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="" type={show2 ? 'password' : 'text'}
                                                    className={`${noRegister ? "border-red-600 " : null}` + "text-md block px-3 py-2 mt-2 rounded-lg w-full border-2 bg-[#1d2432] placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:border-[#6366f1] focus:outline-none"} />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                                    {
                                                        !show2 ?
                                                            <svg onClick={() => setShow2(true)} className="h-6" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                                <path fill="currentColor"
                                                                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                                                </path>
                                                            </svg>
                                                            :
                                                            <svg onClick={() => setShow2(false)} className="h-6" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                                <path fill="currentColor"
                                                                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                                                </path>
                                                            </svg>

                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="block text-gray-500 font-bold my-4">
                                                <input type="checkbox" className="leading-loose text-[#6366f1]" />
                                                <span className="py-2 text-sm text-[#9ca3afbd] leading-snug ml-3">
                                                    Ricordati
                                                </span>
                                            </label>
                                        </div>
                                        <button type='button' onClick={(e) => register(e)} className="mt-3 text-lg font-semibold w-full rounded-lg px-6 py-3 block shadow-xl text-white bg-[#6366f1] hover:bg-[#6365f1db] transition ease-in-out delay-150 hover:-translate-y-1">
                                            Registrati
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default Register;