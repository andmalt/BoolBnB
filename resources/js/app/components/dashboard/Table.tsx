import moment from 'moment';
import React from 'react'
import { TrashIcon, ChevronDoubleLeft, ChevronDoubleRight, ModifyIcon } from '..';
import api from '../../services/connection_manager';
import { setDashboardComponents, setIdNumber } from '../../services/functions';
import { PaginateHouses, Photos } from '../../services/interfaces'
import { variablesDashboard } from '../../services/variables';
import { loading } from '../../store/authSlice';
import { setDashboard, setNumber } from '../../store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
interface TableProps {
    houses?: PaginateHouses
    paginate(link: string | null): Promise<void>
    deleteHome(e: any, id: number): Promise<void>
}

const Table = (props: TableProps) => {
    const { houses, paginate, deleteHome } = props;
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
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">Casa</th>
                                <th className="px-4 py-3">Creato</th>
                                <th className="px-4 py-3">Aggiornato</th>
                                <th className="px-4 py-3">Azioni</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            {
                                houses?.data.length != 0 && houses?.data != undefined ?
                                    houses?.data.map((house, i) => {
                                        let photo: Photos = {
                                            id: 0,
                                            image_url: "https://via.placeholder.com/640x480.png/#C0C0C0?text=",
                                            apartment_id: 0
                                        }
                                        house.photos?.forEach((el, i) => {
                                            if (i == 0) {
                                                photo = el;
                                            }
                                        })
                                        return (
                                            <tr key={`${house.title}-${i}`} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center text-sm">
                                                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                            <img className="object-cover w-full h-full rounded-full" src={photo?.image_url.includes("https://") ||
                                                                photo?.image_url.includes("http://") ? photo?.image_url : `/storage/apartments/images/${photo?.image_url}`} alt="" loading="lazy" />
                                                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                        </div>
                                                        <div onClick={() => changePage(variablesDashboard.HOME, house.id)}>
                                                            <p className="font-semibold cursor-pointer">{house.title}</p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer">{house.city}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">{moment(house.created_at).format("DD/MM/YY HH:mm:ss")}</td>
                                                <td className="px-4 py-3 text-sm">{moment(house.updated_at).format("DD/MM/YY HH:mm:ss")}</td>
                                                {/* action row */}
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex flex-row flex-wrap justify-between items-center">
                                                        <button onClick={() => changePage(variablesDashboard.CREATE_UPDATE, house.id)}>{<ModifyIcon className='stroke-blue-600' />}</button>
                                                        <button onClick={(e) => deleteHome(e, house.id)}>{<TrashIcon className='stroke-red-600' />}</button>
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
                                                    <p className="font-semibold">Non hai inserito nessuna casa</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    <span className="flex items-center col-span-3"> Mostrando {houses ? houses?.current_page : "0"} di {houses ? houses?.last_page : "0"} {houses?.last_page == 1 ? "pagina" : "pagine"}</span>
                    <span className="col-span-2"></span>
                    {/* <!-- Pagination --> */}
                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center">
                                {
                                    houses?.last_page != 1 || undefined ?
                                        houses?.links.map((button, i) => {
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

export default Table