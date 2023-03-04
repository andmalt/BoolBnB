import React, { useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { House, PaginateHouses } from '../../services/interfaces';
import { variablesDashboard } from '../../services/variables';
import { clear, error, loading } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import MyHome from './MyHome';
import Table from './Table';

const MyHomes = () => {
    const [myHouses, setMyHouses] = useState<PaginateHouses>();
    const authSelector = useAppSelector(state => state.auth);
    const dashSelector = useAppSelector(state => state.dashboard)
    const dispatch = useAppDispatch();

    const getMyHouses = async () => {
        dispatch(loading())
        try {
            const response = await api.getAllMyHouses(authSelector.token);
            // console.log("response:", response.data.apartments);

            if (response.data.success) {
                setMyHouses(response.data.apartments)
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
            <Table houses={myHouses} paginate={paginate} />
        </div>
    )
}

export default MyHomes;