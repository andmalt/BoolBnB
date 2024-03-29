import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../services/connection_manager';
import { deleteLocalStorage, setDashboardComponents, setIdNumber, setIsCreate } from '../../services/functions';
import { PaginateHouses } from '../../services/interfaces';
import { variablesDashboard } from '../../services/variables';
import { clear, error, loading, logout } from '../../store/authSlice';
import { setDashboard, setIsCte, setNumber } from '../../store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Table from './Table';

const MyHomes = () => {
    const [myHouses, setMyHouses] = useState<PaginateHouses>();
    const authSelector = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const page = document.getElementById("body-container");

    const getMyHouses = async () => {
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.getAllMyHouses(authSelector.token);
            // console.log("response:", response.data.apartments);

            if (response.data.success) {
                setMyHouses(response.data.apartments)
                dispatch(clear())
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

    const createHome = () => {
        setDashboardComponents(variablesDashboard.CREATE_UPDATE);
        dispatch(setDashboard(variablesDashboard.CREATE_UPDATE))
        // clear home number in the store
        setIsCreate(true)
        dispatch(setIsCte(true))
        setIdNumber(null)
        dispatch(setNumber(null))
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
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.paginateMyHM(authSelector.token, link);
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
            <div className='p-3'>
                <button className='bg-[#6366f1] hover:bg-[#6365f1b3] rounded-md text-white px-6 py-2' onClick={() => createHome()}>Crea una casa</button>
            </div>
            <Table houses={myHouses} paginate={paginate} deleteHome={deleteHome} isStatistics={false} />
        </div>
    )
}

export default MyHomes;