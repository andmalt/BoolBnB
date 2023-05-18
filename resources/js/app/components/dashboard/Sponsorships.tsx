import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { House, Sponsorship } from '../../services/interfaces';
import { clear, error, loading } from '../../store/authSlice';
import api from '../../services/connection_manager';
import moment from 'moment';

const Sponsorships = () => {
    const authSelector = useAppSelector(store => store.auth);
    const dashSelector = useAppSelector(store => store.dashboard);
    const [home, setHome] = useState<House | null>(null);
    const [sponsorship, setSponsorship] = useState<Sponsorship>();
    const dispatch = useAppDispatch();

    const getMyHouse = async () => {
        dispatch(loading())
        try {
            const response = await api.getMyHome(authSelector.token, dashSelector.id);
            // console.log(response.data.apartment);
            // console.log(response.data.apartment.sponsorships[0]);
            if (response.data.success) {
                setHome(response.data.apartment)
                setSponsorship(response.data.apartment.sponsorships[0])
            }
            dispatch(clear())
        } catch (e) {
            console.log("error myhome", e);
            dispatch(error())
        }
    }


    useEffect(() => {
        let isMount = true;
        if (isMount) {
            getMyHouse()
        }
        return () => {
            isMount = false;
        }
    }, [])

    return (
        <div>
            <div className='flex flex-col justify-center items-center mb-4'>
                <h1 className='text-white uppercase text-2xl'>{home?.title}</h1>
                <div className='flex'>
                    <p className='text-white mr-1'>{home?.city}</p>
                    <p className='text-white'>{home?.address}</p>
                </div>
            </div>
            <div>
                {
                    sponsorship ?
                        <p className='text-white'>La casa <span className=' uppercase'>{home?.title}</span> è gia sponsorizzata con il livello <span className='uppercase'>{sponsorship.name}</span> e scadrà {moment(sponsorship.pivot.end_date).format("DD/MM/YYYY HH:mm:ss")}</p>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default Sponsorships