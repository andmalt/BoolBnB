import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { House, Sponsorship } from '../../services/interfaces';
import { clear, error, loading } from '../../store/authSlice';
import api from '../../services/connection_manager';
import moment from 'moment';
import { SponsorshipCard } from '..';

const Sponsorships = () => {
    const authSelector = useAppSelector(store => store.auth);
    const dashSelector = useAppSelector(store => store.dashboard);
    const [home, setHome] = useState<House | null>(null);
    const [sponsorship, setSponsorship] = useState<Sponsorship>();
    const [sponsorships, setSponsorships] = useState<Sponsorship[]>();
    const [token, setToken] = useState<string>();
    const [idSponsorship, setIdSponsorship] = useState<number>();
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

    const getSponsorships = async () => {
        dispatch(loading())
        try {
            const response = await api.getSponsorships(authSelector.token);
            // console.log(response.data);
            if (response.data.success) {
                setSponsorships(response.data.sponsorships)
            }
            dispatch(clear())
        } catch (e) {
            console.log("error getSponsorships", e);
            dispatch(error())
        }
    }

    const generateToken = async (id: number) => {
        dispatch(loading())
        // console.log(id);
        try {
            const response = await api.generateToken(authSelector.token);
            // console.log(response.data);
            if (response.data.success) {
                setToken(response.data.token)
                setIdSponsorship(id)
            }
            dispatch(clear())
        } catch (e) {
            console.log("error getSponsorships", e);
            dispatch(error())
        }
    }


    useEffect(() => {
        let isMount = true;
        if (isMount) {
            getMyHouse()
                .finally(() => {
                    getSponsorships()
                })
        }
        return () => {
            isMount = false;
        }
    }, [])

    return (
        <div>
            <div className='flex flex-col justify-center items-center mb-20'>
                <h1 className='text-white uppercase text-2xl'>{home?.title}</h1>
                <div className='flex'>
                    <p className='text-white mr-1'>{home?.city},</p>
                    <p className='text-white'>{home?.address}</p>
                </div>
            </div>
            <div>
                {
                    sponsorship ?
                        <div>
                            <p className='text-white'>La casa <span className='uppercase'>{home?.title}</span> è gia sponsorizzata con il livello <span className='uppercase'>{sponsorship.name}</span> e scadrà il {moment(sponsorship.pivot.end_date).format("DD/MM/YYYY HH:mm")} .</p>
                        </div>
                        :
                        <div className='flex flex-col justify-center items-center'>
                            <h3 className='mb-10 text-white'>Scegli il tipo di sponsorizzazione per la tua casa</h3>
                            <div className='flex flex-wrap flex-row justify-center items-center w-full'>
                                {
                                    sponsorships?.map((sp, i) => {
                                        return (
                                            <SponsorshipCard key={i} name={sp.name} price={sp.price} duration={sp.duration} generateToken={() => generateToken(sp.id)} />
                                        )
                                    })
                                }
                            </div>

                        </div>
                }
            </div>
            <div>
                {/*  */}
            </div>
        </div>
    )
}

export default Sponsorships