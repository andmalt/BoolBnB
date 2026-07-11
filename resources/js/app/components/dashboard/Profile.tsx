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
                const user = response.data.user;
                setName(user.name);
                setSurname(user.surname);
                setEmail(user.email);
                setPhoto(user.avatar_url || "");
                setRegisteredSince(user.created_at)
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
        <div className='mx-4 my-4 flex flex-col items-center justify-start'>
            <div className='w-full max-w-3xl'>
                <div className="card overflow-hidden">
                    {/* header band */}
                    <div className='h-24 bg-gradient-to-r from-brand-600 to-brand-700'></div>
                    <div className='px-6 pb-6 sm:px-8'>
                        <div className="-mt-14 mb-6 flex items-end gap-4">
                            <img className="h-28 w-28 rounded-2xl border-4 border-white object-cover shadow-md dark:border-ink-700" src={!photo ? "./default-user/user.png" : photo} alt="my photo" />
                            <div className='pb-1'>
                                <h2 className="text-xl font-bold text-heading">{name} {surname}</h2>
                                <p className='text-sm text-muted'>{email}</p>
                            </div>
                        </div>

                        <ul className='divide-y divide-slate-100 text-sm dark:divide-white/5'>
                            <li className="flex items-center justify-between py-3">
                                <span className='font-medium text-muted'>Nome</span>
                                <span className='font-semibold text-heading'>{name}</span>
                            </li>
                            <li className="flex items-center justify-between py-3">
                                <span className='font-medium text-muted'>Cognome</span>
                                <span className='font-semibold text-heading'>{surname}</span>
                            </li>
                            <li className="flex items-center justify-between py-3">
                                <span className='font-medium text-muted'>Email</span>
                                <span className='font-semibold text-brand-600 dark:text-brand-400'>{email}</span>
                            </li>
                            <li className="flex items-center justify-between py-3">
                                <span className='font-medium text-muted'>Stato</span>
                                <span
                                    className={classNames("rounded-full px-3 py-1 text-xs font-semibold", emailVerificationSelector.emailVerification ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-600 dark:text-red-400")}>
                                    {emailVerificationSelector.emailVerification ? 'Attivo' : 'Non attivo'}
                                </span>
                            </li>
                            <li className="flex items-center justify-between py-3">
                                <span className='font-medium text-muted'>Registrato dal</span>
                                <span className='font-semibold text-heading'>{moment(registeredSince).format("DD/MM/YY HH:mm")}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    !emailVerificationSelector.emailVerification ?
                        <div className='card mt-6 flex flex-col items-center gap-4 border-amber-400/40 p-6 text-center sm:flex-row sm:text-left'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-8 w-8 shrink-0 text-amber-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className='flex-1 text-sm text-slate-700 dark:text-slate-300'>Per attivare il tuo account devi verificare l'email che ti è stata spedita.</p>
                            <button className='btn btn-primary shrink-0' onClick={() => emailResend()}>Reinvia l'email</button>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default Profile;