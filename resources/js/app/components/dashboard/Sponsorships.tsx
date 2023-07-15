import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { House, Sponsorship } from '../../services/interfaces';
import { clear, error, loading } from '../../store/authSlice';
import api from '../../services/connection_manager';
import moment from 'moment';
import { Braintree, SponsorshipCard, Xmark } from '..';
import { classNames } from '../../services/functions';

const Sponsorships = () => {
    const authSelector = useAppSelector(store => store.auth);
    const dashSelector = useAppSelector(store => store.dashboard);
    const [home, setHome] = useState<House | null>(null);
    // house sponsorship
    const [sponsorship, setSponsorship] = useState<Sponsorship>();
    // all sponsorship available
    const [sponsorships, setSponsorships] = useState<Sponsorship[]>();
    // sponsorship chosen
    const [sp, setSp] = useState<Sponsorship>();
    const [token, setToken] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [idSponsorship, setIdSponsorship] = useState<number>(0);
    const dispatch = useAppDispatch();
    const page = document.getElementById("body-container");

    const closeDrawer = () => setShow(false);

    const sponsorshipChosen = (sponsorship: Sponsorship) => setSp(sponsorship);

    const getMyHouse = async () => {
        page?.scrollIntoView();
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
        page?.scrollIntoView();
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

    const generateToken = async (id: number, sponsorship: Sponsorship) => {
        page?.scrollIntoView();
        dispatch(loading())
        sponsorshipChosen(sponsorship);
        // console.log(id);
        try {
            const response = await api.generateToken(authSelector.token);
            // console.log(response.data);
            if (response.data.success) {
                setToken(response.data.token)
                setIdSponsorship(id)
                setShow(true)
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
            <div className='flex flex-col justify-center items-center mb-20 dark:text-white text-black'>
                <h1 className='uppercase text-2xl'>{home?.title}</h1>
                <div className='flex'>
                    <p className='mr-1'>{home?.city},</p>
                    <p>{home?.address}</p>
                </div>
            </div>
            <div>
                {
                    sponsorship ?
                        <div>
                            <p className='dark:text-white text-black'>La casa <span className='uppercase'>{home?.title}</span> è sponsorizzata con il livello <span className='uppercase'>{sponsorship.name}</span> e scadrà il {moment(sponsorship.pivot.end_date).format("DD/MM/YYYY HH:mm")} .</p>
                        </div>
                        :
                        <div className='flex flex-col justify-center items-center'>
                            <h3 className='mb-10 dark:text-white text-black'>Scegli il tipo di sponsorizzazione per la tua casa</h3>
                            <div className='flex flex-wrap flex-row justify-center items-center w-full'>
                                {
                                    sponsorships?.map((sp, i) => {
                                        return (
                                            <SponsorshipCard key={i} name={sp.name} price={sp.price} duration={sp.duration} generateToken={() => generateToken(sp.id, sp)} />
                                        )
                                    })
                                }
                            </div>

                        </div>
                }
            </div>
            <div>
                {/* Drawer where is displayed the Braintree drop in */}
                <div className={classNames(show ? "translate-x-0 " : "translate-x-full", 'fixed z-30 w-[100vw] h-[100vh] top-0 right-0 ease-in-out duration-100 bg-[rgba(0,0,0,0.5)]')}>
                    <div
                        className={classNames('top-0 right-0 xl:w-[35vw] lg:w-[45vw] md:w-[75vw] w-[100vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300', show ? "translate-x-0 " : "translate-x-full")}
                    >
                        <div className='flex justify-end items-center w-full mb-6'>
                            <Xmark onClick={() => closeDrawer()} className=' cursor-pointer hover:scale-90' />
                        </div>
                        <Braintree clientToken={token} show={show} id={idSponsorship} getMyHouse={getMyHouse} closeDrawer={closeDrawer} sponsorship={sp} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sponsorships