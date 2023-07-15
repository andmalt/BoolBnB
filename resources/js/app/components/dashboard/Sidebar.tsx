import React, { useEffect } from 'react'
import { classNames, setDashboardComponents, setIdNumber, setIsCreate, setTrashed } from '../../services/functions';
import { variablesDashboard } from "../../services/variables";
import { setDashboard, setIsCte, setNumber } from '../../store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsTrashMessages } from '../../store/messageSlice';
import { Link } from 'react-router-dom';

interface SidebarProps {
    emailVerification: boolean;
}

/**
 * 
 * 
 */
const Sidebar = (props: SidebarProps) => {
    const { emailVerification } = props;
    const dispatch = useAppDispatch();
    const messagesSelector = useAppSelector(state => state.messages);

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
        <div className="flex flex-col left-0 md:top-0 w-14 hover:w-40 hover:md:w-52 md:w-48 xl:w-60 xl:hover:w-[280px] 2xl:w-[300px] 2xl:hover:w-[336px] dark:bg-[#0a121e] bg-slate-200 border-[#29303d] dark:text-white text-black transition-all duration-300 h-[100vh] fixed z-20">
            <div className='overflow-hidden md:block hidden py-10 px-6'>
                <Link to={'/'}>
                    <h1 className="pr-6 text-2xl font-bold text-[#6366f1]">BoolBnB</h1>
                </Link>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                    <li className="px-5 hidden md:block">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm tracking-wide text-[#6366f1] font-bold uppercase">My Dashboard</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" onClick={emailVerification ? () => changeComponents(variablesDashboard.HOUSES) : () => { }} className={classNames("relative flex flex-row items-center h-11 focus:outline-none dark:hover:bg-[#6366f1] hover:bg-gray-300 border-l-4 border-transparent dark:hover:border-blue-600 hover:border-gray-800 pr-6", emailVerification ? "cursor-pointer" : "cursor-not-allowed")}>
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Case</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={emailVerification ? () => changeComponents(variablesDashboard.STATISTIC) : () => { }} className={classNames("relative flex flex-row items-center h-11 focus:outline-none dark:hover:bg-[#6366f1] hover:bg-gray-300 border-l-4 border-transparent dark:hover:border-blue-600 hover:border-gray-800 pr-6", emailVerification ? "cursor-pointer" : "cursor-not-allowed")}>
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>

                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Statistiche</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={emailVerification ? () => changeComponents(variablesDashboard.MESSAGES) : () => { }} className={classNames("relative flex flex-row items-center h-11 focus:outline-none dark:hover:bg-[#6366f1] hover:bg-gray-300 border-l-4 border-transparent dark:hover:border-blue-600 hover:border-gray-800 pr-6", emailVerification ? "cursor-pointer" : "cursor-not-allowed")}>
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Messaggi</span>
                            {
                                messagesSelector.lengthMessagesRead ?
                                    <span className="hidden md:block px-2 py-1 ml-auto text-xs font-medium tracking-wide text-gray-50 bg-orange-500 rounded-full">{messagesSelector.lengthMessagesRead}</span>
                                    :
                                    null
                            }
                        </a>
                    </li>
                    <li className="px-5 hidden md:block">
                        <div className="flex flex-row items-center mt-5 h-8">
                            <div className="text-sm tracking-wide text-[#6366f1] font-bold uppercase">Impostazioni</div>
                        </div>
                    </li>
                    <li>
                        <a onClick={() => changeComponents(variablesDashboard.PROFILE)} href="#" className="relative flex flex-row items-center h-11 focus:outline-none dark:hover:bg-[#6366f1] hover:bg-gray-300 border-l-4 border-transparent dark:hover:border-blue-600 hover:border-gray-800 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Profilo</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() => changeComponents(variablesDashboard.SETTINGS)} className="relative flex flex-row items-center h-11 focus:outline-none dark:hover:bg-[#6366f1] hover:bg-gray-300 border-l-4 border-transparent dark:hover:border-blue-600 hover:border-gray-800 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Impostazioni</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar