import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Messages, Notifications, Sidebar, SocialTraffic, Statistics, Table } from '../components';
import { useAppSelector } from '../store/hooks';
import { getDashboardComponents } from '../services/functions';
import "../../../css/dashboard.css"
import { variablesDashboard } from '../services/variables';

const Dashboard = () => {
    const [email, setEmail] = useState<string | null>();
    const [name, setName] = useState<string | null>();
    const navigate = useNavigate();
    const authSelector = useAppSelector(state => state.auth);
    const dashSelector = useAppSelector(state => state.dashboard)

    const controlAuth = () => {
        setName(authSelector.name)
        setEmail(authSelector.email)
    }

    const checkAuth = () => {
        if (authSelector.token == null) {
            navigate("/")
        }
    }

    useEffect(() => {
        let isMount = true;
        if (isMount) {
            checkAuth()
            controlAuth()
        }
        return () => { isMount = false; }
    }, []);
    return (
        <div id='dashboard' className="flex flex-row flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
            <div className='w-1/4 lg:w-1/5 h-full'>
                {/* <!-- Sidebar --> */}
                <Sidebar />
            </div>


            <div className="h-full mt-4 mb-10 w-3/4 lg:w-4/5 lg:m-6">
                {
                    dashSelector.dashboard == variablesDashboard.HOUSES ?
                        <Table />
                        :
                        dashSelector.dashboard == variablesDashboard.STATISTIC ?
                            <Statistics />
                            :
                            dashSelector.dashboard == variablesDashboard.MESSAGE ?
                                <Messages />
                                :
                                dashSelector.dashboard == variablesDashboard.MESSAGE ?
                                    <Notifications />
                                    :
                                    dashSelector.dashboard == variablesDashboard.PROFILE ?
                                        <Form />
                                        :
                                        dashSelector.dashboard == variablesDashboard.SETTINGS ?
                                            <SocialTraffic />
                                            :
                                            null
                }

                {/* <!-- Statistics Cards --> */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard;