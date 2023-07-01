import React, { useState } from 'react'
import api from '../services/connection_manager';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate()

    const resetLink = async (e: any) => {
        e.preventDefault()
        const data = {
            email,
        }
        try {
            const response = await api.passwordResetLink(data)
            if (response.data.success) {
                toast.success("Reset link della password creato correttamente, controlla la tua email!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                navigate('/')
            } else {
                toast.error("Reset link della password non creato, controlla che l'email sia giusta!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        } catch (e) {
            console.log("Error reset link:", e);
        }
    }

    return (
        <div className='w-[100%] h-[100%]'>
            <section className=" dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Hai dimenticato la password? Nessun problema. Comunicaci il tuo indirizzo e-mail e ti invieremo un link per reimpostare la password che ti consentirà di sceglierne una nuova.
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" method='POST' onSubmit={(e) => resetLink(e)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">La tua email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgetPassword