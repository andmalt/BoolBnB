import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/connection_manager';
import { deleteLocalStorage } from '../../services/functions';
import { PaginateMessages } from '../../services/interfaces';
import { clear, error, loading, logout } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TopBarMessages, MessagesTable } from '..';

const Messages = () => {
    const [myMessages, setMyMessages] = useState<PaginateMessages>();
    const authSelector = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const update = async () => {
        await getMyMessages()
        console.log("message update");
    }

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

    const deleteMessage = async (e: any, id: number) => {
        e.preventDefault()
        const confirm = window.confirm('Sicuro di voler cancellare il messaggio?');
        if (!confirm) {
            return;
        }
        dispatch(loading())
        const response = await api.deleteMyMessage(authSelector.token, id);
        if (response.data.success) {
            getMyMessages()
        }
        // console.log("response=", response);
        dispatch(clear())
    }

    const paginate = async (link: string) => {
        dispatch(loading())
        try {
            const response = await api.paginateMyHM(authSelector.token, link);
            if (response.data.success) {
                setMyMessages(response.data.messages)
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
                <TopBarMessages update={update} />
            </div>
            <div>
                <MessagesTable messages={myMessages} paginate={paginate} deleteMessage={deleteMessage} />
            </div>
        </div>
    )
}

export default Messages;