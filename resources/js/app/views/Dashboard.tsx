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
import { deleteLocalStorage, setLengthMessagesRead, setTrashed } from '../services/functions';
import { clear, error, loading, logout } from '../store/authSlice';
import { setIsTrashMessages, setMessagesNotRead } from '../store/messageSlice';
import api from '../services/connection_manager';

const Dashboard = () => {
    const page = document.getElementById("body-container");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authSelector = useAppSelector(state => state.auth);
    const dashSelector = useAppSelector(state => state.dashboard)
    const emailVerificationSelector = useAppSelector(state => state.emailVerification);

    const checkAuth = async () => {
        if (authSelector.token == null) {
            deleteLocalStorage()
            dispatch(logout())
            navigate("/")
        }
    }

    const getMyMessages = async () => {
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.getAllMyMessagesCount(authSelector.token);
            // console.log("response:", response.data);
            if (response.data.success) {
                setLengthMessagesRead(response.data.messagesNotRead)
                dispatch(setMessagesNotRead(response.data.messagesNotRead))
            } else {
                dispatch(logout())
                deleteLocalStorage()
                navigate("/")
            }
            dispatch(clear())
        } catch (e) {
            console.log("paginate error:", e);
            dispatch(error())
        }
    }

    useEffect(() => {
        let isMount = true;
        if (isMount) {
            checkAuth()
            getMyMessages()
        }
        return () => { isMount = false; }
    }, []);
    return (
        <div id='dashboard' className="flex flex-row flex-auto flex-shrink-0 antialiased">
            <div className='w-1/4 lg:w-1/5 h-full'>
                {/* <!-- Sidebar --> */}
                <Sidebar emailVerification={emailVerificationSelector.emailVerification} />
            </div>


            <div className="h-full mt-4 mb-10 w-3/4 lg:w-4/5 lg:m-6">
                {

                    dashSelector.dashboard == variablesDashboard.PROFILE ?
                        <Profile />
                        :
                        dashSelector.dashboard == variablesDashboard.STATISTIC ?
                            <Statistics />
                            :
                            dashSelector.dashboard == variablesDashboard.MESSAGES ?
                                <Messages />
                                :
                                dashSelector.dashboard == variablesDashboard.HOUSES ?
                                    <MyHomes />
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