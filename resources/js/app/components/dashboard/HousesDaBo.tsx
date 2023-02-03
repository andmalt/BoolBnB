import React, { useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { House, PaginateHouses } from '../../services/interfaces';
import { clear, error, loading } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Table from './Table';

const HousesDaBo = () => {
    const [myHouses, setMyHouses] = useState<PaginateHouses>();
    const authSelector = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const getMyHouses = async () => {
        dispatch(loading())
        try {
            const response = await api.getAllMyHouses(authSelector.token);
            console.log("response:", response.data.apartments);

            if (response.data.success) {
                setMyHouses(response.data.apartments)
            }
            dispatch(clear())
        } catch (e) {
            dispatch(error())
            return { success: false, error: 500 }
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
            <Table houses={myHouses} />
        </div>
    )
}

export default HousesDaBo;