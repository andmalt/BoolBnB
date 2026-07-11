import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from 'react-i18next';
import "../../../css/home.css"

const Main = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const authSelector = useAppSelector(state => state.auth);

    const goToHomes = () => {
        navigate("/homes")
    }

    return (
        <div className='h-full w-full'>
            <div id='house-container' className='relative w-full'>
                {/* dark overlay for readability, in both themes */}
                <div className='absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/60 to-ink-950/30'></div>
                <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-24 sm:px-6 xl:py-32">
                    <div className="animate-enter max-w-2xl text-center sm:text-left">
                        <span className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur'>
                            <span className='h-1.5 w-1.5 rounded-full bg-brand-400'></span>
                            {t("home.badge")}
                        </span>
                        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                            {t("home.title")} <span className='text-brand-300'>{t("home.titleHighlight")}</span>.
                        </h1>
                        <p className="mt-5 text-lg text-slate-200">
                            {t("home.subtitle")}
                        </p>
                        <div className='mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-start'>
                            <button onClick={() => goToHomes()} className="btn btn-primary w-full !px-8 !py-3 !text-base sm:w-auto">
                                {t("home.searchHouse")}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                            {
                                authSelector.token == null ?
                                    <button onClick={() => navigate("/register")} className="btn w-full border border-white/25 bg-white/10 !px-8 !py-3 !text-base text-white backdrop-blur hover:bg-white/20 sm:w-auto">
                                        {t("home.registerFree")}
                                    </button>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
