import moment from 'moment'
import React from 'react';
import { PaginateMessages } from '../../services/interfaces';

interface MessageTableProps {
    messages?: PaginateMessages,
    paginate?(link: string | null): Promise<void>
    deleteMessage?(e: any, id: number): Promise<void>
}

const MessagesTable = (props: MessageTableProps) => {
    const { messages } = props;

    return (
        <div className="mt-4 mx-4">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">Messaggi</th>
                                <th className="px-4 py-3"></th>
                                <th className="px-4 py-3">Azioni</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {
                                messages?.data.length != 0 && messages?.data != undefined ?
                                    messages?.data.map((message, i) => {

                                        return (
                                            <tr key={`${message.id}-${i}`} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center text-sm">
                                                        {/* <div onClick={() => changePage(variablesDashboard.HOME, house.id)}>
                                                            <p className="font-semibold cursor-pointer">{house.title}</p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer">{house.city}</p>
                                                        </div> */}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm"></td>
                                                {/* action row */}
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex flex-row flex-wrap justify-between items-center">
                                                        {/* <button onClick={() => changePage(variablesDashboard.CREATE_UPDATE, house.id)}>{<ModifyIcon className='stroke-blue-600' />}</button>
                                                        <button onClick={(e) => deleteHome(e, house.id)}>{<TrashIcon className='stroke-red-600' />}</button> */}
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
                    {/* <span className="flex items-center col-span-3"> Mostrando {houses ? houses?.current_page : "0"} di {houses ? houses?.last_page : "0"} {houses?.last_page == 1 ? "pagina" : "pagine"}</span> */}
                    <span className="col-span-2"></span>
                    {/* <!-- Pagination --> */}
                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center">
                                {
                                    // houses?.last_page != 1 || undefined ?
                                    //     houses?.links.map((button, i) => {
                                    //         return (
                                    //             <li key={i}>
                                    //                 <button onClick={() => paginate(button.url)} className={"px-3 py-1 rounded-md focus:outline-none" + `${button.active ? " font-black text-lg" : null}`}>{button.label === "&laquo; Previous" ? <ChevronDoubleLeft /> : button.label === "Next &raquo;" ? <ChevronDoubleRight /> : button.label}</button>
                                    //             </li>
                                    //         )
                                    //     })
                                    //     :
                                    //     null
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