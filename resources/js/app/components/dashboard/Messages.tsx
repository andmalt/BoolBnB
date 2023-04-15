import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/connection_manager';
import { deleteLocalStorage } from '../../services/functions';
import { PaginateMessages } from '../../services/interfaces';
import { clear, error, loading, logout } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import MessagesTable from './MessagesTable';

const Messages = () => {
    const [myMessages, setMyMessages] = useState<PaginateMessages>();
    const authSelector = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getMyMessages = async () => {
        dispatch(loading())
        const page = document.getElementById("body-container");
        page?.scrollIntoView();
        try {
            const response = await api.getAllMyMessages(authSelector.token);
            // console.log("response:", response.data.messages);

            if (response.data.success) {
                setMyMessages(response.data.messages)
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

    const paginate = async (link: string) => {
        dispatch(loading())
        try {
            const response = await api.paginateMyHM(authSelector.token, link);
            if (response.data.success) {
                setMyMessages(response.data.apartments)
            }
            dispatch(clear())
        } catch (e) {
            console.log("paginate error:", e);
            dispatch(error())
        }
    }

    useEffect(() => {
        let isMount = true
        if (isMount) {
            getMyMessages()
        }
        return () => {
            isMount = false
        }
    }, [])


    return (
        <div>
            <div>
                <MessagesTable messages={myMessages} paginate={paginate} />
            </div>
        </div>
    )
}

export default Messages;