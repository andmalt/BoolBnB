import React from 'react'
import "../../../css/footer.css"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer id='footer-container' className='border-t border-slate-200/80 bg-white dark:border-white/10 dark:bg-ink-900'>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
                    {/* brand */}
                    <div className='max-w-sm text-center md:text-left'>
                        <Link to={'/'} className='inline-flex items-center gap-2'>
                            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                                </svg>
                            </span>
                            <span className="text-xl font-bold tracking-tight text-heading">Bool<span className='text-brand-500'>BnB</span></span>
                        </Link>
                        <p className='mt-3 text-sm text-muted'>
                            {t("footer.tagline")}
                        </p>
                    </div>

                    {/* app badges */}
                    <div className='text-center md:text-left'>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">{t("footer.downloadApp")}</h3>
                        <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                            <button onClick={() => alert("premuto Google play Store")} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 transition hover:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-500/60">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-6" alt="Google Play" />
                                <span className="text-left">
                                    <span className='block text-[11px] text-muted'>{t("footer.downloadOn")}</span>
                                    <span className="block text-sm font-semibold text-heading">Google Play</span>
                                </span>
                            </button>
                            <button onClick={() => alert("premuto Apple Store")} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 transition hover:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-500/60">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-6" alt="App Store" />
                                <span className="text-left">
                                    <span className='block text-[11px] text-muted'>{t("footer.downloadOn")}</span>
                                    <span className="block text-sm font-semibold text-heading">App Store</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* links */}
                    <div className='text-center md:text-left'>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">{t("footer.usefulLinks")}</h3>
                        <ul className='mt-4 space-y-2 text-sm'>
                            <li><span className="cursor-pointer text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">{t("footer.aboutUs")}</span></li>
                            <li><span className="cursor-pointer text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">{t("footer.contactUs")}</span></li>
                            <li><span className="cursor-pointer text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">{t("footer.privacy")}</span></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-200/80 pt-6 text-center text-sm text-muted dark:border-white/10">
                    &copy; Maltempi Andrea, 2022. {t("footer.rights")}
                </div>
            </div>
        </footer>
    )
}

export default Footer;
