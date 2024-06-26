import React, { useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { House, Photos } from '../../services/interfaces';
import { clear, error, loading } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';

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
    const [mapZoom, setMapZoom] = useState<number>(5);
    const [map, setMap] = useState<tt.Map>();
    const mapElement = React.useRef() as React.MutableRefObject<HTMLInputElement>;
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
                setMapLongitude(response.data.apartment.lon)
                setMapLatitude(response.data.apartment.lat)
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
        let map = tt.map({
            key: "CskONgb89uswo1PwlNDOtG4txMKrp1yQ",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });
        new tt.Marker().setLngLat([mapLongitude, mapLatitude]).addTo(map);

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
        <div className='flex flex-col flex-wrap items-center'>
            <div className='dark:bg-[#6366f1] bg-slate-200 shadow-md rounded-lg py-6 px-12 mb-20'>
                <h1 className="dark:text-white text-black font-bold text-lg md:text-4xl">{home?.title}</h1>
            </div>
            <div className='flex flex-row flex-wrap justify-center items-start mb-10'>
                <div className="h-[250px] w-[350px] md:h-[400px] md:w-[500px] lg:h-[500px] lg:w-[600px] p-2 dark:bg-[#6366f1] bg-slate-200 dark:shadow-md rounded-lg mb-5 lg:mb-0">
                    <div className="overflow-hidden relative h-full">
                        {/* Item */}
                        {/* fixed photos */}
                        {
                            photos?.length != 0 && photos != undefined ?
                                <div className="duration-700 ease-in-out">
                                    <img src={photo?.image_url.includes("https://") ||
                                        photo?.image_url.includes("http://") ? photo?.image_url : `/storage/apartments/images/${photo?.image_url}`} className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt={`image ${photo?.id}`} />
                                </div>
                                :
                                <div className="duration-700 ease-in-out">
                                    <img src="https://tailus.io/sources/blocks/twocards/preview/images/woman.jpg" className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." />
                                </div>
                        }
                        {/* Slider controls */}
                        <button onClick={() => previousImage()} type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
                            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/30  hover:bg-black/50 focus:ring-4 focus:ring-white focus:outline-none">
                                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                <span className="hidden">Previous</span>
                            </span>
                        </button>
                        <button onClick={() => nextImage()} type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
                            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/30 hover:bg-black/50 focus:ring-4 focus:ring-white focus:outline-none">
                                <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                <span className="hidden">Next</span>
                            </span>
                        </button>
                        <div className="absolute right-0 bottom-0 md:bottom-2 w-14 h-7 bg-slate-600 flex justify-center items-center">
                            <p className="text-white">{numberPhoto}/{lengthPhotos}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='dark:bg-[#6366f1] bg-slate-200 shadow-md text-black rounded-lg p-6 sm:ml-5 dark:text-white ml-0 mb-5'>
                        <h5 className='font-bold mb-3 uppercase'>Caratteristiche Immobile</h5>
                        <ul>
                            <li>Metri quadri: {home?.square}</li>
                            <li>Bagno/i: {home?.bathrooms}</li>
                            <li>Camera/e: {home?.rooms}</li>
                            <li>Letto/i: {home?.beds}</li>
                        </ul>
                    </div>
                    <div className='dark:bg-[#6366f1] bg-slate-200 shadow-md text-black rounded-lg px-6 py-3 sm:ml-5 dark:text-white ml-0 flex flex-row justify-start items-center'>
                        <h4 className='font-bold uppercase align-middle'>Prezzo &euro;{home?.price} <span className='normal-case italic'>per notte</span></h4>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-wrap w-full items-center'>
                <div className='dark:bg-[#6366f1] bg-slate-200 shadow-md rounded-lg p-6 w-[80%] dark:text-white text-black mb-4'>
                    <h3 className='mb-3 font-bold uppercase'>{home?.city}</h3>
                    <h4 className='italic'>{home?.region}</h4>
                    <h4 className='italic'>{home?.address}</h4>
                </div>
                <div className='dark:bg-[#6366f1] bg-slate-200 shadow-md rounded-lg p-6 w-[80%] dark:text-white text-black'>
                    <p>{home?.description}</p>
                </div>
                {/* map component */}
                <div className='my-16'>
                    <div ref={mapElement} className="mapDiv"></div>
                </div>
            </div>
        </div>
    )
}

export default MyHome;