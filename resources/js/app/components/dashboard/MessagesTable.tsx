import moment from 'moment'
import React from 'react';
import { ChevronDoubleLeft, ChevronDoubleRight, TrashIcon } from '..';
import { PaginateMessages } from '../../services/interfaces';
import { useAppSelector } from '../../store/hooks';


interface MessageTableProps {
    messages?: PaginateMessages,
    paginate(link: string | null): Promise<void>
    deleteMessage(e: any, id: number): Promise<void>
    destroyMessage(e: any, id: number): Promise<void>
    restoreMessage(e: any, id: number): Promise<void>
    getMyMessage(id: number): Promise<void>
}

const MessagesTable = (props: MessageTableProps) => {
    const { messages, paginate, deleteMessage, destroyMessage, restoreMessage, getMyMessage } = props;
    const messagesSelector = useAppSelector(state => state.messages);

    return (
        <div className="mt-4 mx-4">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">Messaggi</th>
                                <th className="px-4 py-3">Data</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {
                                messages?.data.length != 0 && messages?.data != undefined ?
                                    messages?.data.map((message, i) => {
                                        const isRead = (isRead: boolean) => {
                                            if (isRead) {
                                                return " bg-white "
                                            }
                                            return " bg-gray-100 "
                                        }

                                        return (
                                            <tr key={`${message.id}-${i}`} className={" dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400" + isRead(message.is_read)}>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center text-sm overflow-hidden">
                                                        {
                                                            !messagesSelector.isTrashedMessages ?
                                                                <div onClick={() => getMyMessage(message.id)}>
                                                                    <p className="font-semibold cursor-pointer text-lg">{message.name} {message.surname}</p>
                                                                    <p className="cursor-pointer">{message.email}</p>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <p className="font-semibold cursor-pointer text-lg">{message.name} {message.surname}</p>
                                                                    <p className="cursor-pointer">{message.email}</p>
                                                                </div>
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-xs">{moment(message.created_at).format("DD/MM/YY HH:mm:ss")}</td>
                                                {/* action row */}
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex flex-row flex-wrap justify-end items-center">
                                                        {
                                                            messagesSelector.isTrashedMessages ?
                                                                <div className='flex flex-wrap items-center'>
                                                                    <form onSubmit={(e) => restoreMessage(e, message.id)}>
                                                                        {/* restore message */}
                                                                        <button type="submit" className='mx-2'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                                                            </svg>
                                                                        </button>
                                                                    </form>
                                                                    <form onSubmit={(e) => destroyMessage(e, message.id)}>
                                                                        <button type="submit" className='mx-2'>{<TrashIcon className='stroke-red-600' />}</button>
                                                                    </form>
                                                                </div>



                                                                :
                                                                <form onSubmit={(e) => deleteMessage(e, message.id)}>
                                                                    <button type="submit">{<TrashIcon className='stroke-red-600' />}</button>
                                                                </form>
                                                        }

                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                <div>
                                                    <p className="font-semibold">Non ci sono messaggi</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm"></td>
                                        <td className="px-4 py-3 text-sm"></td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    <span className="flex items-center col-span-3"> Messaggi totali: {messages?.total} </span>
                    <span className="col-span-2"></span>
                    {/* <!-- Pagination --> */}
                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center">
                                {
                                    messages?.last_page != 1 || undefined ?
                                        messages?.links.map((button, i) => {
                                            return (
                                                <li key={i}>
                                                    <button onClick={() => paginate(button.url)} className={"px-3 py-1 rounded-md focus:outline-none" + `${button.active ? " font-black text-lg" : null}`}>{button.label === "&laquo; Previous" ? <ChevronDoubleLeft /> : button.label === "Next &raquo;" ? <ChevronDoubleRight /> : button.label}</button>
                                                </li>
                                            )
                                        })
                                        :
                                        null
                                }
                            </ul>
                        </nav>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MessagesTable;