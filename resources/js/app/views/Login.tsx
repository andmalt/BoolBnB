import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/connection_manager';
import { useAppDispatch } from '../store/hooks';
import {
    clear,
    authenticated,
    loading,
    error,
} from '../store/authSlice';
import { toast } from 'react-toastify';
import { getRememberEmail, setRememberEmail } from '../services/functions';

type Form = {
    email: string[],
    password: string[],
}

const Login = () => {
    const [show, setShow] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isRemember, setIsRemember] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>();
    const [errors, setErrors] = useState<Form>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const setLogin = async (e: any) => {
        e.preventDefault()
        dispatch(loading());
        if (isRemember) {
            setRememberEmail(email)
        }
        try {
            const response = await api.login(email, password);
            if (response.data.success) {
                dispatch(authenticated(response.data.token))
                setEmail("")
                setPassword("")
                dispatch(clear())
                toast.success("Hai effettuato il login!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // console.log("store token: ", response.data.token);
                return navigate("/dashboard");
            }
            toast.error("Le credenziali sono errate!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            dispatch(clear())
        } catch (e) {
            dispatch(error())
            console.log("error login");
        }
    }

    const handleOnChange = () => {
        setIsRemember(!isRemember);
    };

    useEffect(() => {
        let isMount = true
        if (isMount) {
            const email = getRememberEmail()
            if (email) {
                setEmail(email)
            }
        }
        return () => { isMount = false }
    }, []);

    return (
        <div className="container max-w-full mx-auto py-24 px-6 bg-slate-100 dark:bg-[#111827]">
            <div className="font-sans">
                <div className="max-w-sm mx-auto px-6">
                    <div className="relative flex flex-wrap">
                        <div className="w-full relative">
                            <div className="mt-6">
                                <div className="text-center font-bold dark:text-white text-black text-[25px] mb-10">
                                    Accedi a BoolBnB
                                </div>

                                <form >
                                    <div className='mx-auto max-w-lg dark:text-white text-black'>
                                        <div className="py-2">
                                            <span className="px-1 text-sm font-bold">Email</span>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" type="email"
                                                className="block px-3 py-2 mt-2 rounded-lg w-full dark:bg-[#1d2432] bg-gray-50 dark:text-white text-black border shadow-sm border-slate-300 dark:border-[#0f1623] placeholder-gray-600 focus:placeholder-gray-500 focus:border-[#6366f1] focus:outline-none" />
                                        </div>
                                        <div className="py-2">
                                            <span className="px-1 text-sm font-bold">Password</span>
                                            <div className="relative">
                                                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" type={show ? 'password' : 'text'} className="block px-3 py-2 mt-2 rounded-lg w-full
                                                dark:bg-[#1d2432] bg-gray-50 dark:text-white text-black border shadow-sm border-slate-300 dark:border-[#0f1623] placeholder-gray-600
                                                focus:placeholder-gray-500
                                               focus:border-[#6366f1] focus:outline-none" />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                                    {
                                                        !show ?
                                                            <svg onClick={() => setShow(true)} className="h-6 dark:text-white text-black" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                                <path fill="currentColor"
                                                                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                                                </path>
                                                            </svg>
                                                            :
                                                            <svg onClick={() => setShow(false)} className="h-6 dark:text-white text-black" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                                <path fill="currentColor"
                                                                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                                                </path>
                                                            </svg>

                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="block font-bold my-4">
                                                <input type="checkbox" value={"remember"} checked={isRemember} onChange={handleOnChange} className="leading-loose text-[#6366f1]" />
                                                <span className="py-2 text-sm text-gray-500 dark:text-[#9ca3afbd] leading-snug ml-3">
                                                    Ricordati
                                                </span>
                                            </label>
                                            <label className="block font-bold my-4">
                                                <Link to="/forgot-password" className="cursor-pointer tracking-tighter text-[#6366f1] hover:text-[#6365f1de]">
                                                    <span>
                                                        Password dimenticata?
                                                    </span>
                                                </Link>
                                            </label>
                                        </div>
                                        <button type='button' onClick={(e) => setLogin(e)} className="mt-3 text-lg font-semibold hover:bg-[#6365f1e9] w-full rounded-lg px-6 py-3 block shadow-xl text-white bg-[#6366f1] transition ease-in-out delay-150 hover:-translate-y-1">
                                            Accedi
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

export default Login