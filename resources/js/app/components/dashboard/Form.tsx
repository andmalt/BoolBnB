import React, { useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { clear, error, loading } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import DialogModal from '../DialogModal'

interface FormProps {
    houseId?: number,
}

/**
 * 
 * Contact Form 
 */
const Form = (props: FormProps) => {
    const { houseId } = props;
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [errors, setErrors] = useState<[]>();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [type, setType] = useState<string>("guest");
    const dispatch = useAppDispatch();

    const sendMessage = async (e: any) => {
        e.preventDefault()
        dispatch(loading())
        const data = {
            name,
            surname,
            email,
            message,
            houseId,
        }
        console.log("data:", data);
        try {
            const response = await api.guestSendEmail(name, surname, email, message, houseId);
            if (response.data.success) {
                console.log("message send");
                setName("")
                setSurname("")
                setEmail("")
                setMessage("")
                dispatch(clear())
            } else {
                setErrors(response.data.error.message.response.data.errors.message_content)
                setIsOpenModal(true)
                console.log("message not send", response);
                dispatch(clear())
            }
        } catch (e) {
            console.log("error email send:", e);
            // dispatch(error())
            setIsOpenModal(true)
            dispatch(clear())
        }
        // remeber to added here popup for send message
    }

    return (
        <div className="mt-8 mx-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <DialogModal errors={errors} setOpenModal={() => setIsOpenModal(false)} openModal={isOpenModal} type={type} />
                <div className="p-6 mr-2 bg-gradient-to-br from-blue-800 to-[rgb(20,20,20)] sm:rounded-lg">
                    <h1 className="text-4xl sm:text-5xl text-white font-extrabold tracking-tight">Contattaci</h1>
                    <p className="text-normal text-lg sm:text-2xl font-medium text-white mt-2">Compila il form per sottoporre qualsiasi richiesta {houseId ? "al proprietario della casa." : null}</p>
                    {
                        houseId !== undefined ?
                            null
                            :
                            <>
                                <div className="flex items-center mt-8 text-white ">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div className="ml-4 tracking-wide font-semibold w-40">Rome, Italy</div>
                                </div>

                                <div className="flex items-center mt-4 text-white ">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div className="ml-4 tracking-wide font-semibold w-40">+39 1234567890</div>
                                </div>

                                <div className="flex items-center mt-4 text-white ">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div className="ml-4 tracking-wide font-semibold w-40">info@demo.com</div>
                                </div>
                            </>
                    }

                </div>
                <form className="p-6 flex flex-col justify-center" onSubmit={sendMessage}>
                    <div className="flex flex-col">
                        <label htmlFor='name' className="hidden">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Nome" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none" />
                    </div>

                    <div className="flex flex-col mt-2">
                        <label htmlFor='surname' className="hidden">Surname</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} id="surname" placeholder="Cognome" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none" />
                    </div>

                    <div className="flex flex-col mt-2">
                        <label htmlFor="email" className="hidden">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none" />
                    </div>

                    <div className="flex flex-col mt-2">
                        <label htmlFor="message" className="hidden">Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" placeholder="Messaggio" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none" />
                    </div>

                    <button type="submit" className="md:w-32 bg-blue-600 dark:bg-gray-100 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 hover:bg-blue-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Form;