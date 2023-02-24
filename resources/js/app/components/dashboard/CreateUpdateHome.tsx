import React, { useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { Facilities, House } from '../../services/interfaces';
import { clear, error, loading } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const CreateUpdateHome = () => {
    const [home, setHome] = useState<House>();
    const [homeFacilities, setHomeFacilities] = useState<Facilities[]>()
    const [facilities, setFacilities] = useState<Facilities[]>();
    // 
    const [address, setAddress] = useState<string | undefined>();
    const [bathrooms, setBathrooms] = useState<any | undefined>();
    const [beds, setBeds] = useState<any | undefined>();
    const [city, setCity] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [price, setPrice] = useState<string | undefined>();
    const [rooms, setRooms] = useState<any | undefined>();
    const [square, setSquare] = useState<any | undefined>();
    const [region, setRegion] = useState<string | undefined>();
    const [title, setTitle] = useState<string | undefined>();
    const authSelector = useAppSelector(state => state.auth)
    const dashSelector = useAppSelector(state => state.dashboard)
    const dispatch = useAppDispatch()

    const getMyHouse = async () => {
        dispatch(loading())
        try {
            const response = await api.getMyHome(authSelector.token, dashSelector.id);
            if (response.data.success) {
                console.log("apartment", response.data.apartment);
                setHome(response.data.apartment)
                setBathrooms(response.data.apartment.bathrooms)
                setAddress(response.data.apartment.address)
                setFacilities(response.data.facilities)
            }
            dispatch(clear())
        } catch (e) {
            console.log("error myhome", e);
            dispatch(error())
        }
    }

    const updateMyHome = (e: any) => {
        e.preventDefault();
    }

    useEffect(() => {
        let isMount = true
        if (isMount) {
            getMyHouse()
        }
        return () => {
            isMount = false
        }
    }, [])

    return (
        <div>
            <form id="update-apartment" onSubmit={(e) => updateMyHome(e)} encType="multipart/form-data" >
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Camere
                    </span>
                    <input type={"text"} name="rooms" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di camere" value={rooms} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Posti letto
                    </span>
                    <input type={"text"} name="beds" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero massimo di posti letto" value={beds} onChange={(e) => setBeds(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Bagni
                    </span>
                    <input type={"text"} name="bathrooms" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di bagni" value={bathrooms} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Metri quadri
                    </span>
                    <input type="text" name="square" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di metri quadri" value={square} />
                </label>

                <div className="block mt-5">
                    <span className=" block text-sm font-bold text-slate-700">
                        Servizi
                    </span>
                    <div className="flex flex-row flex-auto flex-wrap">
                        {
                            facilities?.map((facility, i) => {
                                return (
                                    <div key={i} className="mt-1 px-3 py-2">
                                        <label htmlFor={`facility-${facility.id}`} className="block text-sm font-medium text-slate-700">
                                            {facility.name}
                                        </label>
                                        {
                                            <input type="checkbox" id={`facility-${facility.id}`} value={facility.id} className="mt-1 px-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Regione
                    </span>
                    <select name="region" id="region" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1">

                    </select>
                </label>

                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Città
                    </span>
                    <input type="text" name="city" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="in quale città si trova" value={city} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Indirizzo
                    </span>
                    <input type="text" name="address" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="indirizzo della casa" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Descrivi la casa
                    </span>
                    <textarea cols={20} rows={5} name="description" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="una breve descrizione dell'abitazione" value={description}></textarea>
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Prezzo
                    </span>
                    <input type="text" name="price" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="prezzo in euro per notte" value={price} />
                </label>

                <button className="bg-green-700 hover:bg-green-800 text-white rounded-xl py-2 px-6 m-5" type="submit">Modifica</button>
                <a className="bg-blue-500 hover:bg-blue-600 rounded-xl py-2 px-4 m-5" href="{{route('admin.apartment.show',$apartment->id)}}">Torna indietro</a>
            </form>
        </div >
    )
}

export default CreateUpdateHome