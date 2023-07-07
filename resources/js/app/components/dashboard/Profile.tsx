import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clear, error, loading } from '../../store/authSlice';
import api from '../../services/connection_manager';
import { setIsEmailVerification } from '../../store/emailVerificationSlice';
import { classNames } from '../../services/functions';
import moment from 'moment';

interface ProfileProps {

}

const Profile = (props: ProfileProps) => {
    const { } = props;
    const [photo, setPhoto] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [registeredSince, setRegisteredSince] = useState<string>("")
    const authSelector = useAppSelector(state => state.auth);
    const emailVerificationSelector = useAppSelector(state => state.emailVerification);
    const dispatch = useAppDispatch();
    const page = document.getElementById("body-container");

    const getUser = async () => {
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.getUser(authSelector.token)
            if (response.data.success) {
                setName(response.data.user.name)
                setSurname(response.data.user.surname)
                setEmail(response.data.user.email)
                setPhoto(response.data.user.image)
                setRegisteredSince(response.data.user.created_at)
                emailVerification()
            }
            dispatch(clear())
        } catch (e) {
            console.log("Error getUser", e);
            dispatch(error())
        }
    }

    // function that checks if the user has verified the email
    const emailVerification = async () => {
        dispatch(loading())
        try {
            const response = await api.emailVerification(authSelector.token)
            if (response.data.success) {
                dispatch(setIsEmailVerification(true))
            }
            dispatch(clear())
        } catch (e) {
            console.log("emailVerification", e);
            dispatch(error())
        }
    }

    const emailResend = async () => {
        dispatch(loading())
        try {
            const response = await api.emailResend(authSelector.token)
            if (response.data.success) {
                console.log("resended email");
            }
            dispatch(clear())
        } catch (e) {
            console.log("emailVerification", e);
            dispatch(error())
        }
    }


    useEffect(() => {
        let isMount = true;

        if (isMount) {
            getUser()
        }
        return () => {
            isMount = false;
        }
    }, [])



    useEffect(() => {
        let isMount = true;

        if (isMount && !emailVerificationSelector.emailVerification) {
            emailVerification()
        }
        return () => {
            isMount = false;
        }
    }, [])


    return (
        <div className='flex flex-col justify-start items-center'>
            <div className='mb-6 md:w-[90%] lg:w-[75%]'>
                <div className=" bg-[#29303d] p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide text-white">Profilo</span>
                    </div>
                    <div className=" text-white">
                        <div className="flex flex-col justify-start items-start text-sm">
                            <div className="text-center my-4 flex md:ml-[15%]">
                                <img className="h-40 w-40 rounded-full border-4 border-white mx-auto my-2" src={!photo ? "./default-user/user.png" : photo.replace('public/user/image/', 'storage/user/image/')} alt="my photo" />
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-bold">Nome</div>
                                <div className="px-4 py-2">{name}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-bold">Cognome</div>
                                <div className="px-4 py-2">{surname}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-bold">Email</div>
                                <div className="px-4 py-2">
                                    {/* <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a> */}
                                    <a className="text-[#6366f1] italic" >{email}</a>
                                </div>
                            </div>
                        </div>
                        <ul
                            className="bg-[#1d2432] text-white py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Stato</span>
                                <span className="ml-auto"><span
                                    className={classNames("py-1 px-2 rounded text-white text-sm", emailVerificationSelector.emailVerification ? "bg-green-500" : "bg-red-500")}>{emailVerificationSelector.emailVerification ? 'Attivo' : 'Non Attivo'}</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Registrato dal</span>
                                <span className="ml-auto">{moment(registeredSince).format("DD/MM/YY HH:mm")}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    !emailVerificationSelector.emailVerification ?
                        <h4 className='text-white p-1 my-6'>Per attivare il tuo account devi verificare l'email che ti è stata spedita.</h4>
                        :
                        null
                }
            </div>
            <div>
                {
                    emailVerificationSelector.emailVerification ?
                        null
                        :
                        <button className=' rounded-lg p-4 bg-slate-400 hover:bg-slate-300' onClick={() => emailResend()}>Reinvia l'email</button>
                }
            </div>
        </div>
    )
}

export default Profile;