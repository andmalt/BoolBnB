import moment from 'moment';
import React from 'react'
import { TrashIcon, ChevronDoubleLeft, ChevronDoubleRight, ModifyIcon, PaymentIcon } from '..';
import { setDashboardComponents, setIdNumber } from '../../services/functions';
import { PaginateHouses, Photos } from '../../services/interfaces'
import { variablesDashboard } from '../../services/variables';
import { setDashboard, setNumber } from '../../store/dashboardSlice';
import { useAppDispatch } from '../../store/hooks';
interface TableProps {
    houses?: PaginateHouses
    paginate(link: string | null): Promise<void>
    deleteHome?(e: any, id: number): Promise<void>
    isStatistics: boolean
    getStatistics?(id: number): Promise<void>
}

const Table = (props: TableProps) => {
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
            <div className="w-full overflow-hidden rounded-lg shadow-md">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left dark:text-white uppercase border-b dark:bg-[#29303d] text-black bg-slate-300">
                                <th className="px-4 py-3">Casa</th>
                                {
                                    !isStatistics ?
                                        <>
                                            <th className="px-4 py-3">Creato</th>
                                            <th className="px-4 py-3">Aggiornato</th>
                                            <th className="px-4 py-3">Azioni</th>
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
                        <tbody className="bg-[#9ca3af]">
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
                                            <tr key={`${house.title}-${i}`} className="dark:hover:bg-[#1d243240] dark:hover:text-white text-gray-700 dark:bg-[#a9b0bc] bg-slate-50 hover:text-black hover:bg-gray-300">
                                                <td className="px-4 py-3">
                                                    {
                                                        !isStatistics ?
                                                            <>
                                                                <div onClick={() => changePage(variablesDashboard.HOME, house.id)} className="flex items-center text-sm cursor-pointer">
                                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                                        <img className="object-cover w-full h-full rounded-full" src={photo?.image_url.includes("https://") ||
                                                                            photo?.image_url.includes("http://") ? photo?.image_url : `/storage/apartments/images/${photo?.image_url}`} alt="" loading="lazy" />
                                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                                    </div>
                                                                    <div >
                                                                        <p className="font-semibold ">{house.title}</p>
                                                                        <p className="text-x">{house.city}</p>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <div onClick={getStatistics ? () => getStatistics(house.id) : () => { }} className="flex items-center text-sm cursor-pointer">
                                                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                                    <img className="object-cover w-full h-full rounded-full" src={photo?.image_url.includes("https://") ||
                                                                        photo?.image_url.includes("http://") ? photo?.image_url : `/storage/apartments/images/${photo?.image_url}`} alt="" loading="lazy" />
                                                                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                                </div>
                                                                <div >
                                                                    <p className="font-semibold">{house.title}</p>
                                                                    <p className="text-x">{house.city}</p>
                                                                </div>
                                                            </div>
                                                    }

                                                </td>
                                                {
                                                    !isStatistics ?
                                                        <>
                                                            <td className="px-4 py-3 text-sm">{moment(house.created_at).format("DD/MM/YY HH:mm:ss")}</td>
                                                            <td className="px-4 py-3 text-sm">{moment(house.updated_at).format("DD/MM/YY HH:mm:ss")}</td>
                                                            {/* action row */}
                                                            <td className="px-4 py-3 text-sm">
                                                                <div className="flex flex-row flex-wrap justify-between items-center">
                                                                    <button onClick={() => changePage(variablesDashboard.SPONSORSHIPS, house.id)}>{<PaymentIcon className='stroke-black' />}</button>
                                                                    <button onClick={() => changePage(variablesDashboard.CREATE_UPDATE, house.id)}>{<ModifyIcon className='stroke-blue-600' />}</button>
                                                                    <button onClick={deleteHome ? (e) => deleteHome(e, house.id) : () => { }}>{<TrashIcon className='stroke-red-600' />}</button>
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
                                    <tr className="dark:hover:bg-[#1d243240] dark:hover:text-white text-gray-700 dark:bg-[#a9b0bc] bg-slate-50 hover:text-black hover:bg-gray-300">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                <div>
                                                    <p className="font-semibold">Non c'é nessuna casa</p>
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
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide uppercase border-t dark:bg-[#29303d] dark:text-white text-black bg-slate-300 sm:grid-cols-9">
                    <span className="flex items-center col-span-3"> Pagina {houses ? houses?.current_page : "0"} di {houses ? houses?.last_page : "0"}</span>
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