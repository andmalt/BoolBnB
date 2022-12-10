import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components';
import { useAppSelector } from '../store/hooks';
import "../../../css/dashboard.css"
interface DashboardProps {
}

const Dashboard = (props: DashboardProps) => {
    const [email, setEmail] = useState<string | null>();
    const [name, setName] = useState<string | null>();
    const [isMount, setIsMount] = useState<boolean>(true);
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
        if (isMount) {
            checkAuth()
            controlAuth()
        }
        return () => setIsMount(false)
    }, []);
    return (
        <div id='dashboard' className="flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">

            {/* <!-- Sidebar --> */}
            <Sidebar />

            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">

                {/* <!-- Statistics Cards --> */}

                <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">

                </div>
            </div>
        </div>
    )
}

export default Dashboard;