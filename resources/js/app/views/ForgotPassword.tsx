import React, { useState } from 'react'
import api from '../services/connection_manager';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ForgetPassword = () => {
    const { t } = useTranslation();
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
                toast.success(t("auth.resetLinkSuccess"), {
                    position: 'top-right',
                    autoClose: 3000,
                });
                navigate('/')
            } else {
                toast.error(t("auth.resetLinkError"), {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (e) {
            console.log("Error reset link:", e);
        }
    }

    return (
        <div className='page w-full px-4 py-16 sm:px-6'>
            <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-heading">{t("auth.forgotTitle")}</h1>
                    <p className="mt-2 text-muted">
                        {t("auth.forgotSubtitle")}
                    </p>
                </div>

                <div className="card p-8">
                    <form className="space-y-5" method='POST' onSubmit={(e) => resetLink(e)}>
                        <div>
                            <label htmlFor="email" className="field-label">{t("auth.yourEmail")}</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-input" placeholder={t("auth.emailPlaceholder")} />
                        </div>
                        <button type="submit" className="btn btn-primary w-full !py-3">{t("auth.sendResetLink")}</button>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-muted">
                    {t("auth.rememberedPassword")}{' '}
                    <Link to="/login" className="font-semibold text-brand-600 transition hover:text-brand-500 dark:text-brand-400">
                        {t("auth.login")}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgetPassword
