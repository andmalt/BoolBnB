import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../services/connection_manager';
import { clear, error, loading } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';
import {House} from './Homes'

interface HouseProps{

}

const House = (props:HouseProps) => {
    const {} = props;
    const params = useParams();
    const houseId = params.houseId;
    const [ home ,setHome] = useState<House|null>(null);
    const dispatch = useAppDispatch();

    const getHome = async ()=> {
        dispatch(loading())
        try {
            const response = await api.getHome(houseId)
            if(response.data.success){
                setHome(response.data.apartment[0])
                dispatch(clear())
            }
        } catch (e) {
            console.log("error House getHome:",e);
            dispatch(error())
        }
    }

    useEffect(()=>{
        let isMount = true
        if(isMount){
            getHome();
        }
        return ()=> {isMount = false};
    },[]);

    return (
        <div className='text-white'>House {home?.id} {home?.title}</div>
    )
}

export default House;