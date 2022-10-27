import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components';
import { useAppSelector } from '../util/hooks';
export interface DashboardProps {
}

const Dashboard = (props: DashboardProps) => {
    const [email, setEmail] = useState<string | null>();
    const [name, setName] = useState<string | null>();
    const [token, setToken] = useState<string | null>();
    const [isMount, setIsMount] = useState<boolean>(true);
    const navigate = useNavigate();
    const authSelector = useAppSelector(state => state.auth);

    const controlAuth = async () => {
        setToken(authSelector.token)
        setName(authSelector.name)
        setEmail(authSelector.email)
    }

    const checkAuth = () => {
        if (token == null) {
            navigate("/")
        }
    }

    useEffect(() => {
        setIsMount(true)
        if (isMount) {
            controlAuth().finally(() => {
                checkAuth()
                console.log("token2: " + token);
            })
        }
        return () => setIsMount(false)
    }, []);
    return (
        <div className="top-margin-header">
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">

                {/* <!-- Sidebar --> */}
                <Sidebar />

                <div className="h-full ml-14 mt-14 mb-10 md:ml-64">

                    {/* <!-- Statistics Cards --> */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;