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
        <div className='mx-4 my-4'>
            <div className='mb-12 flex flex-col items-center justify-center text-center'>
                <h1 className='text-2xl font-bold tracking-tight text-heading'>{home?.title}</h1>
                <p className='mt-1 flex items-center gap-1.5 text-sm text-muted'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4 shrink-0 text-brand-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {home?.city}, {home?.address}
                </p>
            </div>
            <div>
                {
                    sponsorship ?
                        <div className='card mx-auto flex max-w-2xl items-center gap-4 border-green-500/30 p-6'>
                            <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <p className='text-sm leading-relaxed text-slate-700 dark:text-slate-300'>La casa <span className='font-semibold uppercase text-heading'>{home?.title}</span> è sponsorizzata con il livello <span className='font-semibold uppercase text-brand-600 dark:text-brand-400'>{sponsorship.name}</span> e scadrà il {moment(sponsorship.pivot.end_date).format("DD/MM/YYYY HH:mm")}.</p>
                        </div>
                        :
                        <div className='flex flex-col items-center justify-center'>
                            <h3 className='mb-10 text-lg font-semibold text-heading'>Scegli il tipo di sponsorizzazione per la tua casa</h3>
                            <div className='flex w-full flex-row flex-wrap items-stretch justify-center gap-4'>
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
                        className={classNames('fixed top-0 right-0 z-40 h-full w-[100vw] overflow-y-auto border-l border-slate-200/80 bg-white p-8 text-slate-900 shadow-2xl duration-300 ease-in-out md:w-[75vw] lg:w-[45vw] xl:w-[35vw] dark:border-white/10 dark:bg-ink-800 dark:text-white', show ? "translate-x-0 " : "translate-x-full")}
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