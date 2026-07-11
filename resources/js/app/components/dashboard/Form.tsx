import React, { useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { clear, error, loading } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import DialogModal from '../DialogModal'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface FormProps {
    houseId?: number,
}

/**
 *
 * Contact Form
 */
const Form = (props: FormProps) => {
    const { t } = useTranslation();
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
        try {
            const response = await api.guestSendEmail(name, surname, email, message, houseId);
            if (response.data.success) {
                toast.success(t("contact.sendSuccess"), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                setName("")
                setSurname("")
                setEmail("")
                setMessage("")
            } else {
                toast.error(t("contact.sendError"), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                setErrors(response.data.error.message.response.data.errors.message_content)
                setIsOpenModal(true)
                // console.log("message not send", response);
            }
            dispatch(clear())
        } catch (e) {
            console.log("error email send:", e);
            toast.error("Il messaggio non è stato inviato!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            dispatch(error())
            setIsOpenModal(true)
            // dispatch(clear())
        }
    }

    return (
        <div className="card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <DialogModal errors={errors} setOpenModal={() => setIsOpenModal(false)} openModal={isOpenModal} type={type} />

                {/* info panel */}
                <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-8 text-white sm:p-10">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("contact.title")}</h1>
                    <p className="mt-4 text-brand-100">
                        {t("contact.subtitle")} {houseId ? t("contact.subtitleOwner") : null}
                    </p>
                    {
                        houseId !== undefined ?
                            null
                            :
                            <div className='mt-8 space-y-5'>
                                <div className="flex items-center gap-4">
                                    <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10'>
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    <span className="text-sm font-semibold">Rome, Italy</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10'>
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </span>
                                    <span className="text-sm font-semibold">+39 1234567890</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10'>
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <span className="text-sm font-semibold">info@demo.com</span>
                                </div>
                            </div>
                    }
                </div>

                {/* form */}
                <form className="flex flex-col justify-center gap-4 p-8 sm:p-10" onSubmit={sendMessage}>
                    <div>
                        <label htmlFor='name' className="field-label">{t("contact.name")}</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder={t("contact.namePlaceholder")} className="field-input" />
                    </div>

                    <div>
                        <label htmlFor='surname' className="field-label">{t("contact.surname")}</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} id="surname" placeholder={t("contact.surnamePlaceholder")} className="field-input" />
                    </div>

                    <div>
                        <label htmlFor="email" className="field-label">{t("contact.email")}</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder={t("contact.emailPlaceholder")} className="field-input" />
                    </div>

                    <div>
                        <label htmlFor="message" className="field-label">{t("contact.message")}</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" rows={4} placeholder={t("contact.messagePlaceholder")} className="field-input resize-none" />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2 md:self-start md:!px-10">{t("contact.send")}</button>
                </form>
            </div>
        </div>
    )
}

export default Form;
