import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clear, error, loading } from '../../store/authSlice';
import api from '../../services/connection_manager';
import { setIsEmailVerification } from '../../store/emailVerificationSlice';
import { classNames, getLocalStorage, setDashboardComponents, setIdNumber, setIsCreate } from '../../services/functions';
import { setDashboard, setIsCte, setNumber } from '../../store/dashboardSlice';
import { variablesDashboard } from '../../services/variables';
import moment from 'moment';

type User = {
    name: string;
    surname: string;
    email: string;
    userSince: string;
}
interface ProfileProps {

}

const Profile = (props: ProfileProps) => {
    const { } = props;
    const [user, setUser] = useState<User>();
    const authSelector = useAppSelector(state => state.auth);
    const emailVerificationSelector = useAppSelector(state => state.emailVerification);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isVerified = emailVerificationSelector.emailVerification

    const getUser = () => {
        const { name, surname, email, userSince } = getLocalStorage();
        const user = {
            name,
            surname,
            email,
            userSince
        }
        setUser(user)
    }

    const emailVerification = async () => {
        dispatch(loading())
        try {
            const response = await api.emailVerification(authSelector.token)
            if (response.data.success) {
                dispatch(setIsEmailVerification(true))
                setDashboardComponents(variablesDashboard.HOUSES);
                dispatch(setDashboard(variablesDashboard.HOUSES))
                setIsCreate(false)
                dispatch(setIsCte(false))
                setIdNumber(null)
                dispatch(setNumber(null))
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

        if (isMount && !isVerified) {
            // function that checks if the user has verified the email
            // if the user is verified he will be taken to the messages page
            emailVerification()
        }
        return () => {
            isMount = false;
        }
    }, [])


    return (
        <div className='text-white'>
            <div className='mb-6'>
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">Profilo</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="flex flex-col justify-start items-start text-sm">
                            <div className="text-center my-4 flex md:ml-[15%]">
                                <img className="h-40 w-40 rounded-full border-4 border-white mx-auto my-2" src="https://randomuser.me/api/portraits/women/21.jpg" alt="my photo" />
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-bold">Nome</div>
                                <div className="px-4 py-2">{user?.name}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-bold">Cognome</div>
                                <div className="px-4 py-2">{user?.surname}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-bold">Email</div>
                                <div className="px-4 py-2">
                                    {/* <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a> */}
                                    <a className="text-blue-800 italic" >{user?.email}</a>
                                </div>
                            </div>
                            {/* <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Birthday</div>
                                            <div className="px-4 py-2">Feb 06, 1998</div>
                                        </div> */}
                        </div>
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Stato</span>
                                <span className="ml-auto"><span
                                    className={classNames("py-1 px-2 rounded text-white text-sm", isVerified ? "bg-green-500" : "bg-red-500")}>{isVerified ? 'Attivo' : 'Non Attivo'}</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Membro dal</span>
                                <span className="ml-auto">{moment(user?.userSince).format("DD/MM/YY HH:mm")}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    !isVerified ?
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
                        <button className=' rounded-lg p-4 bg-slate-400' onClick={() => emailResend()}>Reinvia l'email</button>
                }
            </div>
        </div>
    )
}

export default Profile;