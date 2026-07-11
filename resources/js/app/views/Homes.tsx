import maplibregl from 'maplibre-gl';
import React, { useEffect, useRef, useState } from 'react'
import { HouseSmallCard, Pagination } from '../components';
import api from '../services/connection_manager';
import { House, Photos } from '../services/interfaces';
import { clear, error, loading } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { REGIONS } from "../services/variables"
import { useTranslation } from 'react-i18next';
import 'maplibre-gl/dist/maplibre-gl.css';
import "../../../css/homesMap.css"

const HOUSES_PER_PAGE = 6;

const Homes = () => {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState<boolean>(false);
    const [houses, setHouses] = useState<House[]>([]);
    const [photos, setPhotos] = useState<Photos[]>([]);
    const [region, setRegion] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [mapLongitude, setMapLongitude] = useState<number>(12.92935);
    const [mapLatitude, setMapLatitude] = useState<number>(42.37644);
    const [mapZoom, setMapZoom] = useState<number>(4);
    const [map, setMap] = useState<maplibregl.Map>();
    const [housesFiltered, setHousesFiltered] = useState<House[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const mapElement = React.useRef<HTMLDivElement>(null);
    const resultsElement = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const authSelector = useAppSelector(state => state.auth);

    const totalPages = Math.max(1, Math.ceil((housesFiltered?.length ?? 0) / HOUSES_PER_PAGE));
    const paginatedHouses = housesFiltered?.slice(
        (currentPage - 1) * HOUSES_PER_PAGE,
        currentPage * HOUSES_PER_PAGE
    );

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

        // searchbar filter
        const filtered = houses.filter(el => {
            const cityMatch = !city || el.city.trim().toLowerCase().includes(city.trim().toLowerCase());
            const addressMatch = !address || el.address.trim().toLowerCase().includes(address.trim().toLowerCase());
            const regionMatch = !region || el.region.trim().toLowerCase().includes(region.trim().toLowerCase());

            return cityMatch && addressMatch && regionMatch;
        });

        // Sort the filtered array based on the "visible" property
        filtered.sort((a, b) => (a.visible === b.visible ? 0 : a.visible ? -1 : 1));

        // set the housesFiltered array
        setHousesFiltered(filtered)
        setCurrentPage(1)

        setCity("")
        setAddress("")
    }

    const changePage = (page: number) => {
        setCurrentPage(page)
        resultsElement.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    /**
     * make map with markers
     */
    useEffect(() => {
        if (!mapElement.current) return;

        let map = new maplibregl.Map({
            container: mapElement.current,
            style: 'https://tiles.openfreemap.org/styles/bright',
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });
        const createMarkers = () => {
            housesFiltered?.forEach(el => {
                new maplibregl.Marker({ color: "#4f46e5" }).setLngLat([parseFloat(el.lon), parseFloat(el.lat)]).addTo(map);
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
        <div id="main_container" className='w-full'>
            <div className="page py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    {/* page heading */}
                    <div className='mb-8 text-center'>
                        <h1 className='text-3xl font-bold tracking-tight text-heading sm:text-4xl'>{t("homes.title")}</h1>
                        <p className='mt-2 text-muted'>{t("homes.subtitle")}</p>
                    </div>

                    {/* search bar */}
                    <div className="mb-10">
                        <form onSubmit={e => searchHomes(e)} method='POST' className='card mx-auto max-w-4xl p-4 sm:p-5'>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <select
                                    name='regions'
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    className='field-input sm:w-48'
                                >
                                    <option value={""}>{t("homes.allRegions")}</option>
                                    {
                                        REGIONS.map(region => {
                                            return <option key={region} value={region}>{region}</option>
                                        })
                                    }
                                </select>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} id="search-city" className="field-input sm:flex-1" placeholder={t("homes.cityPlaceholder")} />
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} id="search-address" className="field-input sm:flex-1" placeholder={t("homes.addressPlaceholder")} />
                                <button type="submit" className="btn btn-primary shrink-0">
                                    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    {t("homes.search")}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* map */}
                    <div className="mb-12">
                        <div className='card overflow-hidden p-2'>
                            <div ref={mapElement} className="map"></div>
                        </div>
                    </div>

                    {/* results */}
                    <div ref={resultsElement} className='scroll-mt-24'>
                        {
                            !authSelector.isLoading && mounted ?
                                <p className='mb-6 text-sm font-medium text-muted'>
                                    {t("homes.results", { count: housesFiltered?.length ?? 0 })}
                                </p>
                                :
                                null
                        }
                        <div className="grid grid-cols-1 gap-6">
                            {
                                !authSelector.isLoading ?
                                    paginatedHouses?.map(house => {
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
                        {
                            !authSelector.isLoading && mounted && housesFiltered?.length === 0 ?
                                <div className='card mx-auto max-w-md p-10 text-center'>
                                    <p className='text-lg font-semibold text-heading'>{t("homes.noResults")}</p>
                                    <p className='mt-2 text-sm text-muted'>{t("homes.noResultsHint")}</p>
                                </div>
                                :
                                null
                        }
                    </div>

                    {/* pagination */}
                    {
                        !authSelector.isLoading ?
                            <div className='mt-10'>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={changePage}
                                />
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default Homes;
