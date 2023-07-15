import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
    WEEK,
    MONTHS,
    DEFAULT_PROPERTIES_YEAR,
    YearStat,
    MonthStat,
    DEFAULT_PROPERTIES_MONTH
} from '../../services/variables';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import api from '../../services/connection_manager';
import { clear, error, loading, logout } from '../../store/authSlice';
import { PaginateHouses } from '../../services/interfaces';
import { deleteLocalStorage } from '../../services/functions';
import { useNavigate } from 'react-router-dom';
import Table from './Table';

/**
 * statistics card
 */
const Statistics = () => {
    const [homes, setHomes] = useState<PaginateHouses>();
    const [todayVisitors, setTodayVisitors] = useState<number>(0);
    const [totalVisitors, setTotalVisitors] = useState<number>(0);
    const [yearVisitors, setYearVisitors] = useState<YearStat[]>(DEFAULT_PROPERTIES_YEAR);
    const [monthVisitors, setMonthVisitors] = useState<MonthStat[]>(DEFAULT_PROPERTIES_MONTH);
    const [weekVisitors, setWeekVisitors] = useState<MonthStat[]>(DEFAULT_PROPERTIES_MONTH);
    const [thisMonth, setThisMonth] = useState<number>(1);
    const authSelector = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const page = document.getElementById("body-container");

    const getHomes = async () => {
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.getAllMyHouses(authSelector.token)
            if (response.data.success) {
                setHomes(response.data.apartments)
                dispatch(clear())
            } else {
                dispatch(logout())
                deleteLocalStorage()
                navigate("/")
            }
        } catch (e) {
            console.log("paginate error:", e);
            dispatch(error())
        }
    }

    const paginate = async (link: string) => {
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.paginateMyHM(authSelector.token, link);
            if (response.data.success) {
                setHomes(response.data.apartments)
            }
            dispatch(clear())
        } catch (e) {
            console.log("paginate error:", e);
            dispatch(error())
        }
    }

    const getTodayStatistics = async (id: number) => {
        try {
            const response = await api.getTodayVisits(authSelector.token, id)
            if (response.data.success) {
                setTodayVisitors(response.data.statistics)
            }
        } catch (e) {
            console.log("error getTodayStatistics", e);
        }
    }
    const getTotalStatistics = async (id: number) => {
        try {
            const response = await api.getTotalVisits(authSelector.token, id)
            if (response.data.success) {
                setTotalVisitors(response.data.statistics)
            }
        } catch (e) {
            console.log("error getTodayStatistics", e);
        }
    }
    const getYearStatistics = async (id: number) => {
        try {
            const response = await api.getYearVisits(authSelector.token, id)
            if (response.data.success) {
                setYearVisitors(response.data.statistics)
            }
        } catch (e) {
            console.log("error getYearStatistics", e);
        }
    }
    const getMonthStatistics = async (id: number) => {
        try {
            const response = await api.getMonthVisits(authSelector.token, id)
            if (response.data.success) {
                setMonthVisitors(response.data.statistics)
                setThisMonth(response.data.month)
            }
        } catch (e) {
            console.log("error getMonthStatistics", e);
        }
    }
    const getWeekStatistics = async (id: number) => {
        try {
            const response = await api.getWeekVisits(authSelector.token, id)
            if (response.data.success) {
                setWeekVisitors(response.data.statistics)
            }
        } catch (e) {
            console.log("error getWeekStatistics", e);
        }
    }

    const getStatistics = async (id: number) => {
        page?.scrollIntoView();
        dispatch(loading())
        try {
            await getTodayStatistics(id)
            await getYearStatistics(id)
            await getMonthStatistics(id)
            await getWeekStatistics(id)
            await getTotalStatistics(id)
        } catch (e) {
            dispatch(error())
            console.log('error getStatistics', e);
        }
        dispatch(clear())
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            // title: {
            //     display: true,
            //     text: "Visualizzazioni nell'anno",
            // },
        },
    };

    const data = {
        labels: MONTHS.map(el => el),
        datasets: [
            {
                label: 'Visitatori dell\'anno',
                data: yearVisitors.map((el) => el.total),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59 ,130, 246, 0.5)',
            },
        ],
    };
    const data2 = {
        labels: monthVisitors.map(el => el.day),
        datasets: [
            {
                label: `Visitatori nel mese di ${MONTHS[thisMonth - 1]}`,
                data: monthVisitors.map((el) => el.total),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const data3 = {
        labels: WEEK.map(el => el),
        datasets: [
            {
                label: `Visitatori dell'ultima settimana`,
                data: weekVisitors.map((el) => el.total),
                borderColor: 'rgb(50,205,50)',
                backgroundColor: 'rgba(50,205,50, 0.5)',
            },
        ],
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        let isMount = true;
        if (isMount) {
            getHomes()
        }
        return () => {
            isMount = false;
        }
    }, [])

    return (
        <div className='flex'>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            </div> */}

            <div className='w-[100%] flex-col'>
                {/* home table */}
                <div className='my-4'>
                    <Table
                        houses={homes}
                        paginate={paginate}
                        isStatistics={true}
                        getStatistics={getStatistics} />
                </div>

                <div className='flex flex-wrap gap-2 justify-around items-center my-10'>
                    <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12 mx-2">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl">{todayVisitors}</p>
                            <p>Visitatori di oggi</p>
                        </div>
                    </div>
                    <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12 mx-2">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl">{totalVisitors}</p>
                            <p>Visitatori totali</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 p-4 gap-4 my-6'>
                    {/* Chart */}
                    <div className='dark:bg-[#1d2432] bg-slate-50 shadow-md p-6'>
                        <Line options={options} data={data} />
                    </div>
                    <div className='dark:bg-[#1d2432] bg-slate-50 shadow-md p-6'>
                        <Line options={options} data={data2} />
                    </div>
                    <div className='dark:bg-[#1d2432] bg-slate-50 shadow-md p-6'>
                        <Line options={options} data={data3} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics