import tt from '@tomtom-international/web-sdk-maps';
import React, { useEffect, useState } from 'react'
import { HouseSmallCard } from '../components';
import api from '../services/connection_manager';
import { House, Photos } from '../services/interfaces';
import { clear, error, loading } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { REGIONS } from "../services/variables"
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import "../../../css/homesMap.css"

const Homes = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    const [houses, setHouses] = useState<House[]>([]);
    const [photos, setPhotos] = useState<Photos[]>([]);
    const [region, setRegion] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [mapLongitude, setMapLongitude] = useState<number>(12.92935);
    const [mapLatitude, setMapLatitude] = useState<number>(42.37644);
    const [mapZoom, setMapZoom] = useState<number>(4);
    const [map, setMap] = useState<tt.Map>();
    const [housesFiltered, setHousesFiltered] = useState<House[]>();
    const mapElement = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const dispatch = useAppDispatch();
    const authSelector = useAppSelector(state => state.auth);

    const allHouses = async () => {
        dispatch(loading())
        try {
            const response = await api.getAllHouses();
            if (response.data.success) {
                // console.log(response);
                setPhotos(response.data.photos);
                setHouses(response.data.apartments);
                setHousesFiltered(response.data.apartments)
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
        let filtered = houses.filter(el => {
            if (city && address && region) {
                if (el.city.trim().toLowerCase().slice(0, city.length).includes(city.trim().toLowerCase()) &&
                    el.address.trim().toLowerCase().slice(0, address.length).includes(address.trim().toLowerCase()) &&
                    el.region.trim().toLowerCase().slice(0, region.length).includes(region.trim().toLowerCase())) {
                    return el;
                }
            } else if (city && !address && region) {
                if (el.city.trim().toLowerCase().slice(0, city.length).includes(city.trim().toLowerCase()) &&
                    el.region.trim().toLowerCase().slice(0, region.length).includes(region.trim().toLowerCase())) {
                    return el;
                }
            } else if (city && address && !region) {
                if (el.city.trim().toLowerCase().slice(0, city.length).includes(city.trim().toLowerCase()) &&
                    el.address.trim().toLowerCase().slice(0, address.length).includes(address.trim().toLowerCase())) {
                    return el;
                }
            } else if (!city && address && region) {
                if (el.address.trim().toLowerCase().slice(0, address.length).includes(address.trim().toLowerCase()) &&
                    el.region.trim().toLowerCase().slice(0, region.length).includes(region.trim().toLowerCase())) {
                    return el;
                }
            } else if (region && !city && !address) {
                if (el.region.trim().toLowerCase().slice(0, region.length).includes(region.trim().toLowerCase())) {
                    return el;
                }
            } else if (!region && city && !address) {
                if (el.city.trim().toLowerCase().slice(0, city.length).includes(city.trim().toLowerCase())) {
                    return el;
                }
            } else if (!region && !city && address) {
                if (el.address.trim().toLowerCase().slice(0, address.length).includes(address.trim().toLowerCase())) {
                    return el;
                }
            } else {
                return el;
            }
        })
        // set the housesFiltered array
        setHousesFiltered(filtered)

        // console.log("city", city);
        // console.log("address", address);
        // console.log("region", region);

        setCity("")
        setAddress("")
    }

    /**
     * make map with markers
     */
    useEffect(() => {
        let map = tt.map({
            key: "CskONgb89uswo1PwlNDOtG4txMKrp1yQ",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });
        const createMarkers = () => {
            housesFiltered?.forEach(el => {
                new tt.Marker().setLngLat([parseFloat(el.lon), parseFloat(el.lat)]).addTo(map);
            })
            setMap(map);
        }

        createMarkers()

        return () => map.remove();
    }, [housesFiltered]);

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
            {/* <div className="py-16 bg-gradient-to-br from-blue-800 to-[rgb(20,20,20)]"> */}
            <div className="py-16 dark:bg-[#1d2432] bg-slate-100">
                <div className="container m-auto px-6  md:px-12 xl:px-6">
                    <div className="mb-6 space-y-2 flex justify-center items-center">
                        {/* search bar */}
                        <form onSubmit={e => searchHomes(e)} method='POST'>
                            <div className="flex flex-row justify-center items-center">
                                <select name='regions' value={region} onChange={(e) => setRegion(e.target.value)} className='flex-shrink-0 inline-flex items-center py-2.5 px-7 text-sm font-medium text-center text-white bg-[#6366f1] border rounded-l-lg focus:ring-4 focus:outline-none focus:ring-[#29303d]'>
                                    <option value={""} className="font-bold" >REGIONI</option>
                                    {
                                        REGIONS.map(region => {
                                            return <option key={region} value={region}>{region}</option>
                                        })

                                    }
                                </select>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} id="search-city" className="p-2.5 w-full text-sm text-white placeholder:text-[#9ca3af] dark:bg-[#0a121e] bg-slate-50 border-l-2 border focus:ring-[#6366f1] focus:border-[#6366f1]" placeholder="città..." />
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} id="search-address" className="p-2.5 w-full text-sm text-white placeholder:text-[#9ca3af] dark:bg-[#0a121e] bg-slate-50 rounded-r-lg border-l-2 border focus:ring-[#6366f1] focus:border-[#6366f1] " placeholder="indirizzo..." />
                                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-[#6366f1] rounded-lg border border-black hover:bg-[#6365f1c8] focus:ring-4 focus:outline-none focus:ring-blue-300">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    <span className="sr-only">Cerca</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mb-12 space-y-2 flex justify-center items-center">
                        {/* map */}
                        <div ref={mapElement} className="map"></div>
                    </div>

                    <div className="grid gap-12 grid-cols-1">
                        {
                            !authSelector.isLoading ?
                                housesFiltered?.map(house => {
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