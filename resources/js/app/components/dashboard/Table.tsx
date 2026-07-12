import moment from 'moment';
import React from 'react'
import { TrashIcon, ChevronDoubleLeft, ChevronDoubleRight, ModifyIcon, PaymentIcon } from '..';
import { setDashboardComponents, setIdNumber } from '../../services/functions';
import { PaginateHouses, Photos } from '../../services/interfaces'
import { variablesDashboard } from '../../services/variables';
import { setDashboard, setNumber } from '../../store/dashboardSlice';
import { useAppDispatch } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
interface TableProps {
    houses?: PaginateHouses
    paginate(link: string | null): Promise<void>
    deleteHome?(e: any, id: number): Promise<void>
    isStatistics: boolean
    getStatistics?(id: number): Promise<void>
}

const Table = (props: TableProps) => {
    const { t } = useTranslation();
    const { houses, paginate, deleteHome, isStatistics, getStatistics } = props;
    const dispatch = useAppDispatch()

    /**
     *
     */
    const changePage = (varName: string, id: number) => {
        setDashboardComponents(varName);
        dispatch(setDashboard(varName))
        setIdNumber(id)
        dispatch(setNumber(id))
    }

    return (
        <div className="mt-4 mx-4">
            <div className="card w-full overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200/80 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-muted dark:border-white/10 dark:bg-ink-800">
                                <th className="px-4 py-3">{t("dash.table.house")}</th>
                                {
                                    !isStatistics ?
                                        <>
                                            <th className="px-4 py-3">{t("dash.table.created")}</th>
                                            <th className="px-4 py-3">{t("dash.table.updated")}</th>
                                            <th className="px-4 py-3">{t("dash.table.actions")}</th>
                                        </>

                                        :
                                        <>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </>
                                }
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {
                                houses?.data.length != 0 && houses?.data != undefined ?
                                    houses?.data.map((house, i) => {
                                        let photo: Photos = {
                                            id: 0,
                                            apartment_id: 0,
                                            url: "https://via.placeholder.com/640x480.png/#C0C0C0?text="
                                        }
                                        house.photos?.forEach((el, i) => {
                                            if (i == 0) {
                                                photo = el;
                                            }
                                        })
                                        return (
                                            <tr key={`${house.title}-${i}`} className="text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5">
                                                <td className="px-4 py-3">
                                                    {
                                                        !isStatistics ?
                                                            <>
                                                                <div onClick={() => changePage(variablesDashboard.HOME, house.id)} className="flex cursor-pointer items-center text-sm">
                                                                    <div className="relative mr-3 hidden h-9 w-9 rounded-xl md:block">
                                                                        <img className="h-full w-full rounded-xl object-cover" src={photo?.url} alt="" loading="lazy" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-semibold text-heading">{house.title}</p>
                                                                        <p className="text-xs text-muted">{house.city}</p>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <div onClick={getStatistics ? () => getStatistics(house.id) : () => { }} className="flex cursor-pointer items-center text-sm">
                                                                <div className="relative mr-3 hidden h-9 w-9 rounded-xl md:block">
                                                                    <img className="h-full w-full rounded-xl object-cover" src={photo?.url} alt="" loading="lazy" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold text-heading">{house.title}</p>
                                                                    <p className="text-xs text-muted">{house.city}</p>
                                                                </div>
                                                            </div>
                                                    }

                                                </td>
                                                {
                                                    !isStatistics ?
                                                        <>
                                                            <td className="px-4 py-3 text-sm text-muted">{moment(house.created_at).format("DD/MM/YY HH:mm:ss")}</td>
                                                            <td className="px-4 py-3 text-sm text-muted">{moment(house.updated_at).format("DD/MM/YY HH:mm:ss")}</td>
                                                            {/* action row */}
                                                            <td className="px-4 py-3 text-sm">
                                                                <div className="flex flex-row flex-wrap items-center gap-1">
                                                                    <button title={t("dash.table.sponsor")} className='cursor-pointer rounded-lg p-2 transition hover:bg-slate-200/70 dark:hover:bg-white/10' onClick={() => changePage(variablesDashboard.SPONSORSHIPS, house.id)}>{<PaymentIcon className='stroke-slate-500 dark:stroke-slate-300' />}</button>
                                                                    <button title={t("dash.table.edit")} className='cursor-pointer rounded-lg p-2 transition hover:bg-brand-500/10' onClick={() => changePage(variablesDashboard.CREATE_UPDATE, house.id)}>{<ModifyIcon className='stroke-brand-500' />}</button>
                                                                    <button title={t("dash.table.delete")} className='cursor-pointer rounded-lg p-2 transition hover:bg-red-500/10' onClick={deleteHome ? (e) => deleteHome(e, house.id) : () => { }}>{<TrashIcon className='stroke-red-500' />}</button>
                                                                </div>
                                                            </td>
                                                        </>
                                                        :
                                                        <>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </>
                                                }
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className="text-slate-700 dark:text-slate-300">
                                        <td className="px-4 py-6">
                                            <div className="flex items-center text-sm">
                                                <div>
                                                    <p className="font-semibold">{t("dash.table.noHouses")}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="grid border-t border-slate-200/80 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:grid-cols-9 dark:border-white/10 dark:bg-ink-800">
                    <span className="col-span-3 flex items-center">{t("dash.table.page", { current: houses ? houses?.current_page : "0", last: houses ? houses?.last_page : "0" })}</span>
                    <span className="col-span-2"></span>
                    {/* <!-- Pagination --> */}
                    <span className="col-span-4 mt-2 flex sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center gap-1">
                                {
                                    houses?.last_page != 1 || undefined ?
                                        houses?.links.map((button, i) => {
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

export default Table
