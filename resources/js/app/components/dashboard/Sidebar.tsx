import React from 'react'
import { classNames, setDashboardComponents, setIdNumber, setIsCreate, setTrashed } from '../../services/functions';
import { variablesDashboard } from "../../services/variables";
import { setDashboard, setIsCte, setNumber } from '../../store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsTrashMessages } from '../../store/messageSlice';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
    emailVerification: boolean;
}

const itemClass = (enabled: boolean, active: boolean) => classNames(
    "relative mx-2 flex flex-row items-center h-11 rounded-xl px-2 focus:outline-none transition",
    active
        ? "bg-brand-600/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white",
    enabled ? "cursor-pointer" : "cursor-not-allowed opacity-60"
)

/**
 *
 *
 */
const Sidebar = (props: SidebarProps) => {
    const { emailVerification } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const messagesSelector = useAppSelector(state => state.messages);
    const dashSelector = useAppSelector(state => state.dashboard);

    const changeComponents = (e: string) => {
        setDashboardComponents(e);
        dispatch(setDashboard(e))
        // clear home number in the store
        setIsCreate(false)
        dispatch(setIsCte(false))
        setIdNumber(null)
        dispatch(setNumber(null))
        if (e === variablesDashboard.MESSAGES) {
            dispatch(setIsTrashMessages(false))
            setTrashed(false)
        }
    }

    return (
        <div className="sticky top-16 z-20 flex h-[calc(100vh-4rem)] w-14 flex-col border-r border-slate-200/80 bg-white transition-all duration-300 hover:w-40 md:w-48 hover:md:w-52 xl:w-60 xl:hover:w-[280px] 2xl:w-[300px] 2xl:hover:w-[336px] dark:border-white/10 dark:bg-ink-900">
            <div className='hidden overflow-hidden py-8 px-6 md:block'>
                <Link to={'/'} className='flex items-center gap-2'>
                    <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                        </svg>
                    </span>
                    <h1 className="text-xl font-bold tracking-tight text-heading">Bool<span className='text-brand-500'>BnB</span></h1>
                </Link>
            </div>
            <div className="flex flex-grow flex-col justify-between overflow-y-auto overflow-x-hidden">
                <ul className="flex flex-col space-y-1 py-4">
                    <li className="hidden px-5 md:block">
                        <div className="flex h-8 flex-row items-center">
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted">{t("sidebar.myDashboard")}</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" onClick={emailVerification ? () => changeComponents(variablesDashboard.HOUSES) : () => { }} className={itemClass(emailVerification, dashSelector.dashboard == variablesDashboard.HOUSES)}>
                            <span className="ml-2 inline-flex items-center justify-center">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            </span>
                            <span className="ml-3 truncate text-sm font-medium tracking-wide">{t("sidebar.houses")}</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={emailVerification ? () => changeComponents(variablesDashboard.STATISTIC) : () => { }} className={itemClass(emailVerification, dashSelector.dashboard == variablesDashboard.STATISTIC)}>
                            <span className="ml-2 inline-flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                            </span>
                            <span className="ml-3 truncate text-sm font-medium tracking-wide">{t("sidebar.statistics")}</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={emailVerification ? () => changeComponents(variablesDashboard.MESSAGES) : () => { }} className={itemClass(emailVerification, dashSelector.dashboard == variablesDashboard.MESSAGES)}>
                            <span className="ml-2 inline-flex items-center justify-center">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                            </span>
                            <span className="ml-3 truncate text-sm font-medium tracking-wide">{t("sidebar.messages")}</span>
                            {
                                messagesSelector.lengthMessagesRead ?
                                    <span className="ml-auto hidden rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white md:block">{messagesSelector.lengthMessagesRead}</span>
                                    :
                                    null
                            }
                        </a>
                    </li>
                    <li className="hidden px-5 md:block">
                        <div className="mt-5 flex h-8 flex-row items-center">
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted">{t("sidebar.settings")}</div>
                        </div>
                    </li>
                    <li>
                        <a onClick={() => changeComponents(variablesDashboard.PROFILE)} href="#" className={itemClass(true, dashSelector.dashboard == variablesDashboard.PROFILE)}>
                            <span className="ml-2 inline-flex items-center justify-center">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </span>
                            <span className="ml-3 truncate text-sm font-medium tracking-wide">{t("sidebar.profile")}</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() => changeComponents(variablesDashboard.SETTINGS)} className={itemClass(true, dashSelector.dashboard == variablesDashboard.SETTINGS)}>
                            <span className="ml-2 inline-flex items-center justify-center">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </span>
                            <span className="ml-3 truncate text-sm font-medium tracking-wide">{t("sidebar.settings")}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
