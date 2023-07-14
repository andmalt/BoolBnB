import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/connection_manager';
import { deleteLocalStorage, setLengthMessagesRead, setTrashed } from '../../services/functions';
import { PaginateMessages, Messages } from '../../services/interfaces';
import { clear, error, loading, logout } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TopBarMessages, MessagesTable, MessageModal } from '..';
import { setIsTrashMessages, setMessagesNotRead } from '../../store/messageSlice';

const Messages = () => {
    const [myMessages, setMyMessages] = useState<PaginateMessages>();
    const [myMessage, setMyMessage] = useState<Messages>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const authSelector = useAppSelector(state => state.auth);
    const messagesSelector = useAppSelector(state => state.messages);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const page = document.getElementById("body-container");

    const update = async () => {
        if (messagesSelector.isTrashedMessages) {
            await getTrashedMessages()
        } else {
            await getMyMessages()
            await getMyMessagesCount()
        }
        console.log("message updated");
    }

    const getTrashedMessages = async () => {
        dispatch(loading())
        dispatch(setIsTrashMessages(true))
        setTrashed(true)
        page?.scrollIntoView();
        try {
            const response = await api.getAllMyTrashedMessages(authSelector.token);
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

    const closeModal = async () => {
        await getMyMessages()
        await getMyMessagesCount()
        setModalIsOpen(false)

    }

    const getMyMessage = async (id: number) => {
        dispatch(loading())
        dispatch(setIsTrashMessages(false))
        setTrashed(false)
        page?.scrollIntoView();
        try {
            const response = await api.getMyMessage(authSelector.token, id);
            // console.log("response:", response.data.messages);

            if (response.data.success) {
                setMyMessage(response.data.message)
                setModalIsOpen(true)
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

    const getMyMessages = async () => {
        dispatch(loading())
        dispatch(setIsTrashMessages(false))
        setTrashed(false)
        page?.scrollIntoView();
        try {
            const response = await api.getAllMyMessages(authSelector.token);
            // console.log("response:", response.data);
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
    const getMyMessagesCount = async () => {
        dispatch(loading())
        dispatch(setIsTrashMessages(false))
        setTrashed(false)
        page?.scrollIntoView();
        try {
            const response = await api.getAllMyMessagesCount(authSelector.token);
            // console.log("response:", response.data);
            if (response.data.success) {
                setLengthMessagesRead(response.data.messagesNotRead)
                dispatch(setMessagesNotRead(response.data.messagesNotRead))
            }
        } catch (e) {
            console.log("messages count:", e);
            dispatch(error())
        }
        dispatch(clear())
    }

    const restoreMessage = async (e: any, id: number) => {
        e.preventDefault()
        const confirm = window.confirm('Sicuro di voler ripristinare questo messaggio nei ricevuti?');
        if (!confirm) {
            return;
        }
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.restoreMyMessage(authSelector.token, id);
            if (response.data.success) {
                getTrashedMessages()
            }
        } catch (err) {
            console.log("ERROR: delete message=", err);
        }
        dispatch(clear())
    }

    const deleteMessage = async (e: any, id: number) => {
        e.preventDefault()
        const confirm = window.confirm('Sicuro di voler inviare il messaggio nel cestino?');
        if (!confirm) {
            return;
        }
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.deleteMyMessage(authSelector.token, id);
            if (response.data.success) {
                getMyMessages()
            }
        } catch (err) {
            console.log("ERROR: delete message=", err);
        }
        dispatch(clear())
    }
    const destroyMessage = async (e: any, id: number) => {
        e.preventDefault()
        const confirm = window.confirm('Sicuro di voler cancellare definitivamente il messaggio?');
        if (!confirm) {
            return;
        }
        const page = document.getElementById("body-container");
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.destroyMyMessage(authSelector.token, id);
            if (response.data.success) {
                getTrashedMessages()
            }
        } catch (err) {
            console.log("ERROR: delete message=", err);
        }
        dispatch(clear())
    }

    const paginate = async (link: string) => {
        dispatch(loading())
        page?.scrollIntoView();
        try {
            const response = await api.paginateMyHM(authSelector.token, link);
            if (response.data.success) {
                setMyMessages(response.data.messages)
            }
        } catch (e) {
            console.log("paginate error:", e);
            dispatch(error())
        }
        dispatch(clear())
    }

    useEffect(() => {
        let isMount = true
        if (isMount) {
            if (messagesSelector.isTrashedMessages) {
                getTrashedMessages()
            } else {
                getMyMessages()
                getMyMessagesCount()
            }
        }
        return () => {
            isMount = false
        }
    }, [messagesSelector.isTrashedMessages])

    return (
        <div>
            <MessageModal isOpen={modalIsOpen} message={myMessage} closeModal={closeModal} />
            <div>
                <TopBarMessages update={update} trashedMessages={getTrashedMessages} />
            </div>
            <div>
                <MessagesTable
                    messages={myMessages}
                    paginate={paginate}
                    deleteMessage={deleteMessage}
                    destroyMessage={destroyMessage}
                    restoreMessage={restoreMessage}
                    getMyMessage={getMyMessage} />
            </div>
        </div>
    )
}

export default Messages;