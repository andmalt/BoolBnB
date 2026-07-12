import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../services/connection_manager';
import { deleteLocalStorage, setDashboardComponents, setIdNumber, setIsCreate } from '../../services/functions';
import { PaginateHouses } from '../../services/interfaces';
import { variablesDashboard } from '../../services/variables';
import { clear, error, loading, logout } from '../../store/authSlice';
import { setDashboard, setIsCte, setNumber } from '../../store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import Table from './Table';

const MyHomes = () => {
    const { t } = useTranslation();
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
        const confirm = window.confirm(t("dash.confirmDeleteHouse"));
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
            <div className='mx-4 mt-4 flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-xl font-bold tracking-tight text-heading'>{t("dash.myHouses")}</h2>
                <button className='btn btn-primary' onClick={() => createHome()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    {t("dash.createHouse")}
                </button>
            </div>
            <Table houses={myHouses} paginate={paginate} deleteHome={deleteHome} isStatistics={false} />
        </div>
    )
}

export default MyHomes;