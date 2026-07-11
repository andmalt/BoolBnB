import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { House, Photos } from '../services/interfaces';

interface HouseCard {
    photos: Photos[]
    house: House
    id: number
}

const HouseSmallCard = (props: HouseCard) => {
    const { t } = useTranslation();
    const { photos, house, id } = props;
    const { title, description, rooms, beds, bathrooms, price, square, city, address, region } = house;
    const [count, setCount] = useState<number>(0);
    const [photo, setPhoto] = useState<Photos>(photos[count]);
    const navigate = useNavigate();

    const getHome = (id: number) => {
        navigate(`/house/${id}`)
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (count == photos.length - 1) {
            setCount(0)
        } else {
            setCount(count + 1)
        }
    }

    const previousImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (count == 0) {
            setCount(photos.length - 1)
        } else {
            setCount(count - 1)
        }
    }

    const getPhoto = (index: number) => {
        let photo: Photos = photos[count]
        photos.forEach((element, i) => {
            if (i == index) {
                photo = element
            }
        });
        setPhoto(photo)
    }

    useEffect(() => {
        getPhoto(count)
    }, [count])

    return (
        <article
            onClick={() => getHome(id)}
            className="card group flex cursor-pointer flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 md:flex-row dark:hover:shadow-black/40"
        >
            {/* photo carousel */}
            <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-auto md:min-h-64 md:w-80 lg:w-96">
                {
                    photos.length != 0 ?
                        <img
                            src={photo?.url}
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            alt={title}
                        />
                        :
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-100 to-slate-200 dark:from-ink-600 dark:to-ink-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-14 w-14 text-brand-400/70">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                            </svg>
                        </div>
                }

                {/* price badge */}
                <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                    &euro;{price} <span className='font-normal text-slate-300'>{t("card.perNight")}</span>
                </span>

                {/* Slider controls */}
                {
                    photos.length > 1 ?
                        <>
                            <button onClick={previousImage} type="button" aria-label={t("card.prevPhoto")} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer opacity-0 transition group-hover:opacity-100 focus:opacity-100 focus:outline-none">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/50 backdrop-blur hover:bg-ink-950/70">
                                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </span>
                            </button>
                            <button onClick={nextImage} type="button" aria-label={t("card.nextPhoto")} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer opacity-0 transition group-hover:opacity-100 focus:opacity-100 focus:outline-none">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/50 backdrop-blur hover:bg-ink-950/70">
                                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </span>
                            </button>
                            <span className='absolute bottom-3 right-3 rounded-full bg-ink-950/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur'>
                                {count + 1}/{photos.length}
                            </span>
                        </>
                        :
                        null
                }
            </div>

            {/* content */}
            <div className="flex min-w-0 flex-1 flex-col gap-3 p-6">
                <h4 className="text-xl font-bold text-heading sm:text-2xl">{title}</h4>

                <p className='flex items-center gap-1.5 text-sm text-muted'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4 shrink-0 text-brand-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className='truncate'>{address}, {city} ({region})</span>
                </p>

                <div className='flex flex-row flex-wrap gap-2'>
                    <span className='chip'>{square} {t("card.sqm")}</span>
                    <span className='chip'>{rooms} {t("card.rooms")}</span>
                    <span className='chip'>{beds} {t("card.beds")}</span>
                    <span className='chip'>{bathrooms} {t("card.bathrooms")}</span>
                </div>

                <p className="hidden text-sm leading-relaxed text-muted lg:line-clamp-2">{description}</p>

                <span className='mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-600 transition group-hover:gap-2.5 dark:text-brand-400'>
                    {t("card.viewDetails")}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </span>
            </div>
        </article>
    )
}

export default HouseSmallCard;
