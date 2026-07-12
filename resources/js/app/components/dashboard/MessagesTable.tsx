import moment from 'moment'
import React from 'react';
import { ChevronDoubleLeft, ChevronDoubleRight, TrashIcon } from '..';
import { PaginateMessages } from '../../services/interfaces';
import { useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';


interface MessageTableProps {
    messages?: PaginateMessages;
    paginate(link: string | null): Promise<void>;
    deleteMessage(e: any, id: number): Promise<void>;
    destroyMessage(e: any, id: number): Promise<void>;
    restoreMessage(e: any, id: number): Promise<void>;
    getMyMessage(id: number): Promise<void>;
}

const MessagesTable = (props: MessageTableProps) => {
    const { t } = useTranslation();
    const { messages, paginate, deleteMessage, destroyMessage, restoreMessage, getMyMessage } = props;
    const messagesSelector = useAppSelector(state => state.messages);

    return (
        <div className="mt-4 mx-4 mb-6">
            <div className="card w-full overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200/80 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-muted dark:border-white/10 dark:bg-ink-800">
                                <th className="px-4 py-3">{t("dash.messages.title")}</th>
                                <th className="px-4 py-3">{t("dash.messages.date")}</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {
                                messages?.data.length != 0 && messages?.data != undefined ?
                                    messages?.data.map((message, i) => {
                                        // unread messages get a brand tint so they stand out
                                        const isRead = (isRead: boolean) => {
                                            if (isRead) {
                                                return " "
                                            }
                                            return " bg-brand-500/5 dark:bg-brand-500/10 "
                                        }

                                        return (
                                            <tr key={`${message.id}-${i}`} className={"text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5 " + isRead(message.is_read)}>
                                                <td onClick={!messagesSelector.isTrashedMessages ? () => getMyMessage(message.id) : () => { }} className="cursor-pointer px-4 py-3">
                                                    <div className="flex items-center overflow-hidden text-sm">
                                                        <div className='flex items-center gap-2.5'>
                                                            {
                                                                !message.is_read ?
                                                                    <span className='h-2 w-2 shrink-0 rounded-full bg-brand-500' title={t("dash.messages.unread")}></span>
                                                                    :
                                                                    <span className='h-2 w-2 shrink-0'></span>
                                                            }
                                                            <div>
                                                                <p className={"text-base " + (!message.is_read ? "font-bold text-heading" : "font-medium")}>{message.name} {message.surname}</p>
                                                                <p className="text-xs text-muted">{message.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td onClick={!messagesSelector.isTrashedMessages ? () => getMyMessage(message.id) : () => { }} className="cursor-pointer px-4 py-3 text-xs text-muted">{moment(message.created_at).format("DD/MM/YY HH:mm:ss")}</td>
                                                {/* action row */}
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex flex-row flex-wrap items-center justify-end">
                                                        {
                                                            messagesSelector.isTrashedMessages ?
                                                                <div className='flex flex-wrap items-center gap-1'>
                                                                    <form onSubmit={(e) => restoreMessage(e, message.id)}>
                                                                        {/* restore message */}
                                                                        <button type="submit" title={t("dash.messages.restore")} className='cursor-pointer rounded-lg p-2 transition hover:bg-brand-500/10'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-brand-500">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                                                            </svg>
                                                                        </button>
                                                                    </form>
                                                                    <form onSubmit={(e) => destroyMessage(e, message.id)}>
                                                                        <button type="submit" title={t("dash.messages.destroy")} className='cursor-pointer rounded-lg p-2 transition hover:bg-red-500/10'>{<TrashIcon className='stroke-red-500' />}</button>
                                                                    </form>
                                                                </div>



                                                                :
                                                                <div>
                                                                    <form onSubmit={(e) => deleteMessage(e, message.id)}>
                                                                        <div>
                                                                            <button className='cursor-pointer rounded-lg p-2 transition hover:bg-red-500/10' title={t("dash.messages.trash")} type="submit" >{<TrashIcon className='stroke-red-500' />}</button>
                                                                        </div>
                                                                    </form>
                                                                </div>

                                                        }

                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className="text-slate-700 dark:text-slate-300">
                                        <td className="px-4 py-6">
                                            <div className="flex items-center text-sm">
                                                <div>
                                                    <p className="font-semibold">{t("dash.messages.none")}</p>
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
                <div className="grid border-t border-slate-200/80 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:grid-cols-9 dark:border-white/10 dark:bg-ink-800">
                    <span className="col-span-3 flex items-center">{t("dash.messages.total", { count: messages?.total ?? 0 })}</span>
                    <span className="col-span-2"></span>
                    {/* <!-- Pagination --> */}
                    <span className="col-span-4 mt-2 flex sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center gap-1">
                                {
                                    messages?.last_page != 1 || undefined ?
                                        messages?.links.map((button, i) => {
                                            return (
                                                <li key={i}>
                                                    <button onClick={() => paginate(button.url)} className={"inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-lg px-2 transition focus:outline-none " + `${button.active ? "bg-brand-600 font-bold text-white" : "hover:bg-slate-200/70 dark:hover:bg-white/10"}`}>{button.label === "&laquo; Previous" ? <ChevronDoubleLeft /> : button.label === "Next &raquo;" ? <ChevronDoubleRight /> : button.label}</button>
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
