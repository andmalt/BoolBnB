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
import { useTranslation } from 'react-i18next';
import Table from './Table';

/**
 * statistics card
 */
const Statistics = () => {
    const { t } = useTranslation();
    const months = t("months", { returnObjects: true }) as string[];
    const weekDays = t("weekDays", { returnObjects: true }) as string[];
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
        labels: months.map(el => el),
        datasets: [
            {
                label: t("dash.stats.year"),
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
                label: t("dash.stats.month", { month: months[thisMonth - 1] }),
                data: monthVisitors.map((el) => el.total),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const data3 = {
        labels: weekDays.map(el => el),
        datasets: [
            {
                label: t("dash.stats.week"),
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

                <div className='mx-4 my-8 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className="card group flex items-center justify-start gap-2 p-5">
                        <div className="mx-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 transition-transform duration-300 group-hover:scale-110">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-brand-600 dark:text-brand-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-heading">{todayVisitors}</p>
                            <p className='text-sm text-muted'>{t("dash.stats.today")}</p>
                        </div>
                    </div>
                    <div className="card group flex items-center justify-start gap-2 p-5">
                        <div className="mx-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 transition-transform duration-300 group-hover:scale-110">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-brand-600 dark:text-brand-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-heading">{totalVisitors}</p>
                            <p className='text-sm text-muted'>{t("dash.stats.total")}</p>
                        </div>
                    </div>
                </div>

                <div className='mx-4 my-6'>
                    {/* Chart */}
                    <div className='card my-4 p-6'>
                        <Line options={options} data={data} style={{ height: "100%", width: "100%" }} />
                    </div>
                    <div className='card my-4 p-6'>
                        <Line options={options} data={data2} style={{ height: "100%", width: "100%" }} />
                    </div>
                    <div className='card my-4 p-6'>
                        <Line options={options} data={data3} style={{ height: "100%", width: "100%" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics