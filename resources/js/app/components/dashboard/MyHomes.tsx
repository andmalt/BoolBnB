import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../services/connection_manager';
import { deleteLocalStorage } from '../../services/functions';
import { PaginateHouses } from '../../services/interfaces';
import { clear, error, loading, logout } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Table from './Table';

const MyHomes = () => {
    const [myHouses, setMyHouses] = useState<PaginateHouses>();
    const authSelector = useAppSelector(state => state.auth);
    const dashSelector = useAppSelector(state => state.dashboard)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getMyHouses = async () => {
        dispatch(loading())
        const page = document.getElementById("body-container");
        page?.scrollIntoView();
        try {
            const response = await api.getAllMyHouses(authSelector.token);
            // console.log("response:", response.data.apartments);

            if (response.data.success) {
                setMyHouses(response.data.apartments)
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

    const deleteHome = async (e: any, id: number) => {
        e.preventDefault()
        const confirm = window.confirm('Sicuro di voler cancellare la casa?');
        if (!confirm) {
            return;
        }
        dispatch(loading())
        const response = await api.deleteMyHome(authSelector.token, id);
        if (response.data.success) {
            getMyHouses()
        }
        // console.log("response=", response);
        dispatch(clear())
    }

    const paginate = async (link: string) => {
        dispatch(loading())
        try {
            const response = await api.paginateMyHouses(authSelector.token, link);
            if (response.data.success) {
                setMyHouses(response.data.apartments)
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
            getMyHouses()
        }

        return () => {
            isMount = false;
        }
    }, []);

    return (
        <div>
            <Table houses={myHouses} paginate={paginate} deleteHome={deleteHome} />
        </div>
    )
}

export default MyHomes;