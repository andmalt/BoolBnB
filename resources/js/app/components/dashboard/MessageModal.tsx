import React from 'react'
import { Messages } from '../../services/interfaces'
import { useTranslation } from 'react-i18next'

interface MessageModalProps {
    isOpen: boolean
    className?: string
    message?: Messages
    closeModal(): void
}

const MessageModal = (props: MessageModalProps) => {
    const { t } = useTranslation();
    const { isOpen, className, message, closeModal } = props;
    return (
        <>
            {
                isOpen ?
                    <div className={className + ' fixed left-0 top-0 z-20 h-screen w-screen bg-ink-950/60 backdrop-blur-sm'}>
                        <div className='fixed left-1/2 top-1/2 h-auto w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2'>
                            <div className="card w-full overflow-hidden shadow-xl">
                                <div className="flex items-center border-b border-slate-200/80 px-3 py-2 dark:border-white/10" >
                                    <button className='cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white' onClick={closeModal} aria-label={t("dash.messages.close")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                        </svg>
                                    </button>
                                </div>
                                <div id="tabContent">
                                    <div className="p-6 md:p-8" id="about">
                                        <h2 className="mb-1 text-2xl font-bold tracking-tight text-heading">{message?.name} {message?.surname}</h2>
                                        <a href={`mailto:${message?.email}`} className="inline-flex items-center text-sm font-medium text-brand-600 transition hover:text-brand-500 dark:text-brand-400">
                                            {message?.email}
                                        </a>
                                        <p className="mt-5 leading-relaxed text-slate-700 dark:text-slate-300">{message?.message_content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default MessageModal