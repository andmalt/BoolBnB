import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/connection_manager';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const params = useParams();
    const token = params.token;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const navigate = useNavigate()

    const resetUserPassword = async (e: any) => {
        e.preventDefault()
        const data = {
            email,
            password,
            password_confirmation: passwordConfirmation,
            token,
        }
        try {
            const response = await api.resetPassword(data)
            if (response.data.success) {
                toast.success("Hai resettato la password con successo!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                navigate('/login')
            } else {
                toast.error("La password non è stata resettata controlla che non è scaduto il tempo dell'email!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        } catch (e) {
            console.log("Error reset password:", e);
            toast.error("Errore per resettare la password!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }

    return (
        <section className=" bg-slate-100 dark:bg-[#111827]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Cambia Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" method="POST" onSubmit={(e) => resetUserPassword(e)} >
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">La tua Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nuova Password</label>
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conferma password</label>
                            <input type="password" name="confirm-password" id="confirm-password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div> */}
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset passwod</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword