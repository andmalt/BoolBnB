import React from 'react'
import { useNavigate } from 'react-router-dom'
import { clear } from '../store/authSlice'
import { useAppDispatch } from '../store/hooks'
import { useTranslation } from 'react-i18next'

const Error = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const closeError = () => {
        dispatch(clear())
        return navigate("/");
    }

    return (
        <main id="error" className="page absolute z-[11] flex h-screen w-full flex-col items-center justify-center px-4 text-center">
            <p className="text-8xl font-extrabold tracking-tight text-brand-500/20 sm:text-9xl dark:text-brand-400/20">500</p>
            <h1 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">{t("errors.serverErrorTitle")}</h1>
            <p className="mt-3 max-w-md text-muted">
                {t("errors.serverErrorBody")}
            </p>
            <button onClick={() => closeError()} className="btn btn-primary mt-8">
                {t("errors.backHome")}
            </button>
        </main>
    )
}

export default Error
