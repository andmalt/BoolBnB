import React from 'react'
import { Messages } from '../../services/interfaces'

interface MessageModalProps {
    isOpen: boolean
    className?: string
    message?: Messages
    closeModal(): void
}

const MessageModal = (props: MessageModalProps) => {
    const { isOpen, className, message, closeModal } = props;
    return (
        <>
            {
                isOpen ?
                    <div className={className + ' z-20 fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.6)]'}>
                        <div className='fixed w-4/5 h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md'>
                            <div className="w-full dark:bg-[#111827] bg-slate-100 border border-[#0a121e] rounded-lg shadow">
                                <ul className="flex flex-wrap text-sm font-medium text-center border-b border-[#29303d] rounded-t-lg" >
                                    <li className="m-2">
                                        <button className='rounded-full p-1 hover:bg-gray-300 hover:text-white' onClick={closeModal}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-slate-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                                <div id="tabContent">
                                    <div className="p-4 rounded-lg md:p-8" id="about">
                                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight dark:text-white text-black">{message?.name} {message?.surname}</h2>
                                        <p className="mb-3 text-[#9ca3af]">{message?.message_content}</p>
                                        <a href={'#'} className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
                                            {message?.email}
                                            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        </a>
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