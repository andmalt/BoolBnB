import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clear, error, loading } from '../../store/authSlice';
import api from '../../services/connection_manager';
import { setIsEmailVerification } from '../../store/emailVerificationSlice';


interface ProfileProps {

}

const Profile = (props: ProfileProps) => {
    const { } = props;
    const authSelector = useAppSelector(state => state.auth);
    const emailVerificationSelector = useAppSelector(state => state.emailVerification);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const emailVerification = async () => {
        dispatch(loading())
        try {
            const response = await api.emailVerification(authSelector.token)
            if (response.data.success) {
                dispatch(setIsEmailVerification(true))
                navigate('/')
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
        const isVerified = emailVerificationSelector.emailVerification
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
            <div className='m-6'>
                <h2 className=' uppercase text-2xl'>
                    Profilo
                </h2>
            </div>

            <div className='mb-6'>
                {
                    emailVerificationSelector.emailVerification ?
                        <h5>
                            Hai già verificato l'email
                        </h5>
                        :
                        <h5>
                            L'applicazione è bloccata devi verificare prima l'email che ti è stata spedita
                        </h5>
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