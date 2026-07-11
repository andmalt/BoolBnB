import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/connection_manager';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
    const { t } = useTranslation();
    const params = useParams();
    const token = params.token;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const navigate = useNavigate()

    const resetUserPassword = async (e: any) => {
        e.preventDefault()
        const data = {
            email,
            password,
            password_confirmation: passwordConfirmation,
            token,
        }
        try {
            const response = await api.resetPassword(data)
            if (response.data.success) {
                toast.success(t("auth.resetSuccess"), {
                    position: 'top-right',
                    autoClose: 3000,
                });
                navigate('/login')
            } else {
                toast.error(t("auth.resetError"), {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (e) {
            console.log("Error reset password:", e);
            toast.error(t("auth.resetGenericError"), {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    }

    return (
        <div className="page w-full px-4 py-16 sm:px-6">
            <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-heading">{t("auth.resetTitle")}</h1>
                    <p className="mt-2 text-muted">{t("auth.resetSubtitle")}</p>
                </div>

                <div className="card p-8">
                    <form className="space-y-5" method="POST" onSubmit={(e) => resetUserPassword(e)} >
                        <div>
                            <label htmlFor="email" className="field-label">{t("auth.yourEmail")}</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-input" placeholder={t("auth.emailPlaceholder")} />
                        </div>
                        <div>
                            <label htmlFor="password" className="field-label">{t("auth.newPassword")}</label>
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="field-input" />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="field-label">{t("auth.confirmNewPassword")}</label>
                            <input type="password" name="confirm-password" id="confirm-password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="••••••••" className="field-input" />
                        </div>
                        <button type="submit" className="btn btn-primary w-full !py-3">{t("auth.resetPassword")}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
