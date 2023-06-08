import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    CreateUpdate,
    Messages,
    MyHomes,
    Profile,
    Settings,
    Sidebar,
    Sponsorships,
    Statistics
} from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import "../../../css/dashboard.css"
import { variablesDashboard } from '../services/variables';
import MyHome from '../components/dashboard/MyHome';
import PhotoModify from '../components/dashboard/PhotoModify';
import { deleteLocalStorage } from '../services/functions';
import { logout } from '../store/authSlice';

const Dashboard = () => {
    const [email, setEmail] = useState<string | null>();
    const [name, setName] = useState<string | null>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authSelector = useAppSelector(state => state.auth);
    const dashSelector = useAppSelector(state => state.dashboard)

    const setIdentity = () => {
        setName(authSelector.name)
        setEmail(authSelector.email)
    }

    const checkAuth = async () => {
        if (authSelector.token == null) {
            deleteLocalStorage()
            dispatch(logout())
            navigate("/")
        }
    }

    useEffect(() => {
        let isMount = true;
        if (isMount) {
            checkAuth()
            setIdentity()
        }
        return () => { isMount = false; }
    }, []);
    return (
        <div id='dashboard' className="flex flex-row flex-auto flex-shrink-0 antialiased text-black">
            <div className='w-1/4 lg:w-1/5 h-full'>
                {/* <!-- Sidebar --> */}
                <Sidebar />
            </div>


            <div className="h-full mt-4 mb-10 w-3/4 lg:w-4/5 lg:m-6">
                {
                    dashSelector.dashboard == variablesDashboard.HOUSES ?
                        <MyHomes />
                        :
                        dashSelector.dashboard == variablesDashboard.STATISTIC ?
                            <Statistics />
                            :
                            dashSelector.dashboard == variablesDashboard.MESSAGES ?
                                <Messages />
                                :
                                dashSelector.dashboard == variablesDashboard.PROFILE ?
                                    <Profile />
                                    :
                                    dashSelector.dashboard == variablesDashboard.SETTINGS ?
                                        <Settings />
                                        :
                                        dashSelector.dashboard == variablesDashboard.HOME ?
                                            <MyHome />
                                            :
                                            dashSelector.dashboard == variablesDashboard.CREATE_UPDATE ?
                                                <CreateUpdate />
                                                :
                                                dashSelector.dashboard == variablesDashboard.PHOTO ?
                                                    <PhotoModify />
                                                    :
                                                    dashSelector.dashboard == variablesDashboard.SPONSORSHIPS ?
                                                        <Sponsorships />
                                                        :
                                                        null
                }
            </div>
        </div>
    )
}

export default Dashboard;