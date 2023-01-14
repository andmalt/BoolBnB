import tt from '@tomtom-international/web-sdk-maps';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HouseSmallCard } from '../components';
import api from '../services/connection_manager';
import { House, Photos } from '../services/interfaces';
import { clear, error, loading } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import "../../../css/homesMap.css"

const Homes = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    const [houses, setHouses] = useState<House[]>([]);
    const [photos, setPhotos] = useState<Photos[]>([]);
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [mapLongitude, setMapLongitude] = useState<number>(12.92935);
    const [mapLatitude, setMapLatitude] = useState<number>(42.37644);
    const [mapZoom, setMapZoom] = useState<number>(4);
    const [map, setMap] = useState<tt.Map>();
    const mapElement = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const dispatch = useAppDispatch();
    const authSelector = useAppSelector(state => state.auth);

    const allHouses = async () => {
        dispatch(loading())
        try {
            const response = await api.getAllHouses();
            if (response.data.success) {
                console.log(response);
                setPhotos(response.data.photos);
                setHouses(response.data.apartments);
                dispatch(clear())
            } else {
                console.log("error response houses");
                dispatch(error())
            }
        } catch (e) {
            dispatch(error())
            console.log("error allHouses:", e);
        }
        setMounted(true)
    }

    const searchHomes = (e: any) => {
        e.preventDefault();
        console.log("search homes");
        console.log("city", city);
        console.log("address", address);

    }

    useEffect(() => {
        let map = tt.map({
            key: "CskONgb89uswo1PwlNDOtG4txMKrp1yQ",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });
        const createMarkers = () => {
            houses.forEach(el => {
                new tt.Marker().setLngLat([parseFloat(el.lon), parseFloat(el.lat)]).addTo(map);
            })
        }

        createMarkers()

        setMap(map);

        return () => map.remove();
    }, [mounted]);

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            allHouses()
        }
        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <div id="main_container">
            <div className="py-16 bg-gradient-to-br from-blue-800 to-[rgb(20,20,20)]">
                <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div className="mb-6 space-y-2 flex justify-center items-center">
                        {/* added here search bar */}
                        <form onSubmit={e => searchHomes(e)}>
                            <div className="flex flex-row justify-center items-center">
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} id="search-city" className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-l-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="città..." />
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} id="search-address" className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="indirizzo..." />
                                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-800 rounded-lg border border-black hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    <span className="sr-only">Cerca</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mb-12 space-y-2 flex justify-center items-center">
                        {/* map component */}
                        <div ref={mapElement} className="map"></div>
                    </div>

                    <div className="grid gap-12 grid-cols-1">
                        {
                            !authSelector.isLoading ?
                                houses.map(house => {
                                    const p = photos.filter(photo => {
                                        return photo.apartment_id == house.id
                                    });

                                    return (
                                        <HouseSmallCard
                                            id={house.id}
                                            key={house.id}
                                            photos={p}
                                            house={house} />
                                    )
                                })
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homes;