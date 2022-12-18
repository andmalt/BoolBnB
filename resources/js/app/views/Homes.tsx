import React, { useEffect, useState } from 'react'
import { HouseSmallCard } from '../components';
import api from '../services/connection_manager';
import { clear, error, loading } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface House {
    id: number,
    user_id: number,
    title: string,
    description: string,
    rooms: number,
    beds: number,
    bathrooms: number,
    square: number,
    visible: boolean,
    country: string,
    region: string,
    city: string,
    address: string,
    lat: string,
    lon: string
}

export interface Photos {
    id: number,
    apartment_id: number,
    image_url: string
}

const Homes = () => {
    const [houses, setHouses] = useState<House[]>([]);
    const [photos, setPhotos] = useState<Photos[]>([]);
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
    }

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
                    <div className="mb-12 space-y-2 text-center">
                        <h2 className="text-2xl text-cyan-900 font-bold md:text-4xl">Sharing is Caring</h2>
                        <p className="lg:w-6/12 lg:mx-auto">Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum officia aliquid explicabo? Excepturi, voluptate?</p>
                    </div>

                    <div className="grid gap-12 grid-cols-1">
                        {
                            !authSelector.isLoading ?
                                houses.map(house => {
                                    const p = photos.filter(photo => {
                                        return photo.apartment_id == house.id
                                    });

                                    return <HouseSmallCard
                                        key={house.id}
                                        photos={p}
                                        title={house.title}
                                        description={house.description} />
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