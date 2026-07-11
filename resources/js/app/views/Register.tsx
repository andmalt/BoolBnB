import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/connection_manager';
import { authenticated, clear, error, loading } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';
import { toast } from 'react-toastify';
import { getRememberEmail, setRememberEmail } from '../services/functions';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

type Form = {
    name: string[],
    surname: string[],
    email: string[],
    password: string[],
    password2: string[]
}

const Register = () => {
    const { t } = useTranslation();
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [show, setShow] = useState<boolean>(true);
    const [show2, setShow2] = useState<boolean>(true);
    const [errors, setErrors] = useState<Form>();
    const [isError, setIsError] = useState<boolean>();
    const [isRemember, setIsRemember] = useState<boolean>(false);
    const [noRegister, setNoRegister] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const handleOnChange = () => {
        setIsRemember(!isRemember);
    };

    const register = async (e: any) => {
        e.preventDefault()
        dispatch(loading());
        if (password !== password2 || (password === "" && password2 === "")) {
            // creare modale di password non corrette
            setNoRegister(true)
            dispatch(clear())
            return console.log("password errata");
        }
        if (isRemember) {
            setRememberEmail(email)
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
                toast.success(t("auth.registerSuccess"), {
                    position: 'top-right',
                    autoClose: 3000,
                });
                return navigate("/dashboard");
            }
            // setIsError(true)
            // console.log(isError);
            // setErrors(response.data.errors.response.data.errors)
            console.log("register failed");
            dispatch(clear())
            toast.error(t("auth.registerError"), {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (e) {
            /* dispatch(error()) */
            console.log("register error: ", e);
            return null
        }
    }

    return (
        <div className="page w-full px-4 py-16 sm:px-6">
            <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-heading">{t("auth.createAccount")}</h1>
                    <p className="mt-2 text-muted">{t("auth.registerSubtitle")}</p>
                </div>

                <div className="card p-8">
                    <form>
                        <div className="space-y-5">
                            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor='register-name' className="field-label">{t("auth.name")}</label>
                                    <input id='register-name' value={name} onChange={(e) => setName(e.target.value)} placeholder={t("auth.namePlaceholder")} type="text" className="field-input" />
                                </div>
                                <div>
                                    <label htmlFor='register-surname' className="field-label">{t("auth.surname")}</label>
                                    <input id='register-surname' value={surname} onChange={(e) => setSurname(e.target.value)} placeholder={t("auth.surnamePlaceholder")} type="text" className="field-input" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='register-email' className="field-label">{t("auth.email")}</label>
                                <input id='register-email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("auth.emailPlaceholder")} type="email" className="field-input" />
                            </div>
                            <div>
                                <label htmlFor='register-password' className="field-label">{t("auth.password")}</label>
                                <div className="relative">
                                    <input id='register-password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type={show ? 'password' : 'text'}
                                        className={`field-input pr-11 ${noRegister ? "!border-red-500 !ring-red-500/30" : ""}`} />
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
                            <div>
                                <label htmlFor='register-password2' className="field-label">{t("auth.confirmPassword")}</label>
                                <div className="relative">
                                    <input id='register-password2' value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="••••••••" type={show2 ? 'password' : 'text'}
                                        className={`field-input pr-11 ${noRegister ? "!border-red-500 !ring-red-500/30" : ""}`} />
                                    <button type='button' onClick={() => setShow2(!show2)} aria-label={show2 ? t("auth.showPassword") : t("auth.hidePassword")} className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3.5 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200">
                                        {
                                            show2 ?
                                                <EyeIcon className='h-5 w-5' />
                                                :
                                                <EyeSlashIcon className='h-5 w-5' />
                                        }
                                    </button>
                                </div>
                                {
                                    noRegister ?
                                        <p className='mt-2 text-sm font-medium text-red-500'>{t("auth.passwordsDontMatch")}</p>
                                        :
                                        null
                                }
                            </div>
                            <label className="flex cursor-pointer items-center gap-2">
                                <input type="checkbox" value={"remember"} checked={isRemember} onChange={handleOnChange} className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
                                <span className="text-sm text-muted">{t("auth.rememberMe")}</span>
                            </label>
                            <button type='submit' onClick={(e) => register(e)} className="btn btn-primary w-full !py-3">
                                {t("auth.register")}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-muted">
                    {t("auth.haveAccount")}{' '}
                    <Link to="/login" className="font-semibold text-brand-600 transition hover:text-brand-500 dark:text-brand-400">
                        {t("auth.login")}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
