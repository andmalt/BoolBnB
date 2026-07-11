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
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

type Form = {
    email: string[],
    password: string[],
}

const Login = () => {
    const { t } = useTranslation();
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
                toast.success(t("auth.loginSuccess"), {
                    position: 'top-right',
                    autoClose: 3000,
                });
                // console.log("store token: ", response.data.token);
                return navigate("/dashboard");
            }
            toast.error(t("auth.loginError"), {
                position: 'top-right',
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
        <div className="page w-full px-4 py-16 sm:px-6">
            <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-heading">{t("auth.welcomeBack")}</h1>
                    <p className="mt-2 text-muted">{t("auth.loginSubtitle")}</p>
                </div>

                <div className="card p-8">
                    <form>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor='login-email' className="field-label">{t("auth.email")}</label>
                                <input id='login-email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("auth.emailPlaceholder")} type="email" className="field-input" />
                            </div>
                            <div>
                                <label htmlFor='login-password' className="field-label">{t("auth.password")}</label>
                                <div className="relative">
                                    <input id='login-password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type={show ? 'password' : 'text'} className="field-input pr-11" />
                                    <button type='button' onClick={() => setShow(!show)} aria-label={show ? t("auth.showPassword") : t("auth.hidePassword")} className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3.5 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200">
                                        {
                                            show ?
                                                <EyeIcon className='h-5 w-5' />
                                                :
                                                <EyeSlashIcon className='h-5 w-5' />
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input type="checkbox" value={"remember"} checked={isRemember} onChange={handleOnChange} className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
                                    <span className="text-sm text-muted">{t("auth.rememberMe")}</span>
                                </label>
                                <Link to="/forgot-password" className="text-sm font-semibold text-brand-600 transition hover:text-brand-500 dark:text-brand-400">
                                    {t("auth.forgotPassword")}
                                </Link>
                            </div>
                            <button type='submit' onClick={(e) => setLogin(e)} className="btn btn-primary w-full !py-3">
                                {t("auth.login")}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-muted">
                    {t("auth.noAccount")}{' '}
                    <Link to="/register" className="font-semibold text-brand-600 transition hover:text-brand-500 dark:text-brand-400">
                        {t("auth.register")}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
