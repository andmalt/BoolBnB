import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Sidebar, Table } from '../components';
import { useAppSelector } from '../store/hooks';
import "../../../css/dashboard.css"

const Dashboard = () => {
    const [email, setEmail] = useState<string | null>();
    const [name, setName] = useState<string | null>();
    const [isHouses, setIsHouses] = useState<boolean>(true);
    const [isStatistic, setIsStatistic] = useState<boolean>(false);
    const [isMessage, setIsMessage] = useState<boolean>(false);
    const [isProfile, setIsProfile] = useState<boolean>(false);
    const [isSettings, setIsSettings] = useState<boolean>(false);
    const navigate = useNavigate();
    const authSelector = useAppSelector(state => state.auth);

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
            <div className='w-1/4 h-full'>
                {/* <!-- Sidebar --> */}
                <Sidebar />
            </div>


            <div className="h-full mt-4 mb-10 w-3/4">
                {
                    isHouses ?
                        <Table />
                        :
                        null
                }

                {/* <!-- Statistics Cards --> */}

                <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">

                </div>
            </div>
        </div>
    )
}

export default Dashboard;