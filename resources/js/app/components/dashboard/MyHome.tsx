import React, { useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { House, Photos } from '../../services/interfaces';
import { clear, error, loading } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

const MyHome = () => {
    const [home, setHome] = useState<House | null>(null);
    const [lengthPhotos, setLengthPhotos] = useState<number>(0);
    const [numberPhoto, setNumberPhoto] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [photos, setPhotos] = useState<Photos[]>();
    const [photo, setPhoto] = useState<Photos | null>(null);
    const authSelector = useAppSelector(store => store.auth);
    const dashSelector = useAppSelector(store => store.dashboard);
    const [mapLongitude, setMapLongitude] = useState<number>(0);
    const [mapLatitude, setMapLatitude] = useState<number>(0);
    const [mapZoom, setMapZoom] = useState<number>(11);
    const [map, setMap] = useState<maplibregl.Map | null>(null);
    const mapElement = React.useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const nextImage = () => {
        if (count == lengthPhotos - 1) {
            setCount(0)
            setNumberPhoto(1)
        } else {
            setCount(count + 1)
            setNumberPhoto(numberPhoto + 1)
        }
    }

    const previousImage = () => {
        if (count == 0) {
            setCount(lengthPhotos - 1)
            setNumberPhoto(lengthPhotos)
        } else {
            setCount(count - 1)
            setNumberPhoto(numberPhoto - 1)
        }
    }

    const getMyHouse = async () => {
        dispatch(loading())
        try {
            const response = await api.getMyHome(authSelector.token, dashSelector.id);
            if (response.data.success) {
                // console.log("apartment", response.data.apartment);
                setMapLongitude(parseFloat(response.data.apartment.lon))
                setMapLatitude(parseFloat(response.data.apartment.lat))
                setHome(response.data.apartment)
                setPhotos(response.data.apartment.photos)
                setPhoto(response.data.apartment.photos[0])
                setLengthPhotos(response.data.apartment.photos.length)
            }
            dispatch(clear())
        } catch (e) {
            console.log("error myhome", e);
            dispatch(error())
        }
    }

    const getPhoto = (index: number) => {
        if (photos) {
            photos.forEach((element, i) => {
                if (i == index) {
                    setPhoto(element)
                }
            });
        }
    }

    useEffect(() => {
        if (!mapElement.current) return;
        let map = new maplibregl.Map({
            container: mapElement.current,
            style: 'https://tiles.openfreemap.org/styles/bright',
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });
        new maplibregl.Marker().setLngLat([mapLongitude, mapLatitude]).addTo(map);
        setMap(map);

        return () => map.remove();

    }, [mapLatitude || mapLongitude]);

    useEffect(() => {
        getPhoto(count)
    }, [count])

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
        <div className='mx-4 my-4'>
            {/* heading */}
            <div className='mb-8'>
                <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">{home?.title}</h1>
                <p className='mt-2 flex items-center gap-1.5 text-muted'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4 shrink-0 text-brand-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {home?.address}, {home?.city} ({home?.region})
                </p>
            </div>

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                {/* gallery */}
                <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm sm:h-80 lg:col-span-2 lg:h-[420px] dark:border-white/10">
                    {
                        photos?.length != 0 && photos != undefined ?
                            <img src={photo?.url} className="absolute inset-0 h-full w-full object-cover" alt={`image ${photo?.id}`} />
                            :
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-100 to-slate-200 dark:from-ink-600 dark:to-ink-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-16 w-16 text-brand-400/70">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                                </svg>
                            </div>
                    }
                    {/* Slider controls */}
                    {
                        lengthPhotos > 1 ?
                            <>
                                <button onClick={() => previousImage()} type="button" aria-label='Foto precedente' className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer focus:outline-none">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950/50 backdrop-blur transition hover:bg-ink-950/70">
                                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                    </span>
                                </button>
                                <button onClick={() => nextImage()} type="button" aria-label='Foto successiva' className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer focus:outline-none">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950/50 backdrop-blur transition hover:bg-ink-950/70">
                                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </span>
                                </button>
                            </>
                            :
                            null
                    }
                    <span className="absolute bottom-3 right-3 rounded-full bg-ink-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        {numberPhoto}/{lengthPhotos}
                    </span>
                </div>

                {/* side info */}
                <div className='flex flex-col gap-6'>
                    <div className='card p-6'>
                        <h5 className='mb-4 text-sm font-semibold uppercase tracking-wider text-muted'>Caratteristiche immobile</h5>
                        <ul className='space-y-3 text-sm font-medium text-heading'>
                            <li className='flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5'>
                                <span className='text-muted'>Metri quadri</span>
                                <span>{home?.square} mq</span>
                            </li>
                            <li className='flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5'>
                                <span className='text-muted'>Camere</span>
                                <span>{home?.rooms}</span>
                            </li>
                            <li className='flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5'>
                                <span className='text-muted'>Letti</span>
                                <span>{home?.beds}</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span className='text-muted'>Bagni</span>
                                <span>{home?.bathrooms}</span>
                            </li>
                        </ul>
                    </div>
                    <div className='card bg-gradient-to-br from-brand-600 to-brand-700 p-6 !text-white dark:border-brand-500/30'>
                        <p className='text-sm font-medium text-brand-100'>Prezzo</p>
                        <p className='mt-1 text-3xl font-bold text-white'>&euro;{home?.price} <span className='text-base font-normal text-brand-100'>/ notte</span></p>
                    </div>
                </div>
            </div>

            {/* description */}
            <div className='card mt-6 p-6'>
                <h5 className='mb-4 text-sm font-semibold uppercase tracking-wider text-muted'>Descrizione</h5>
                <p className='leading-relaxed text-slate-700 dark:text-slate-300'>{home?.description}</p>
            </div>

            {/* map */}
            <div className='card mt-6 mb-4 p-2'>
                <div className='px-4 pb-2 pt-4'>
                    <h5 className='text-sm font-semibold uppercase tracking-wider text-muted'>Dove si trova</h5>
                    <p className='mt-1 text-sm text-heading'>{home?.address}, {home?.city} ({home?.region})</p>
                </div>
                <div ref={mapElement} className="mapDiv"></div>
            </div>
        </div>
    )
}

export default MyHome;