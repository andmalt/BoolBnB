import React, { useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { House } from '../../services/interfaces';
import { clear, error, loading } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const CreateUpdateHome = () => {
    const [home, setHome] = useState<House>()
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
            }
            dispatch(clear())
        } catch (e) {
            console.log("error myhome", e);
            dispatch(error())
        }
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
            <form id="update-apartment" method={"post"} encType="multipart/form-data" >
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Camere
                    </span>
                    <input type="text" name="rooms" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di camere" value={home?.rooms} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Posti letto
                    </span>
                    <input type="text" name="beds" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero massimo di posti letto" value={home?.beds} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Bagni
                    </span>
                    <input type="text" name="bathrooms" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di bagni" value={home?.bathrooms} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Metri quadri
                    </span>
                    <input type="text" name="square" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di metri quadri" value={home?.square} />
                </label>

                <div className="block mt-5">
                    <span className=" block text-sm font-bold text-slate-700">
                        Servizi
                    </span>
                    <div className="flex flex-row flex-auto flex-wrap">
                        <div className="mt-1 px-3 py-2">
                            <label htmlFor="facility-{{ $facility->id }}" className=" block text-sm font-medium text-slate-700">
                                {/*  */}
                            </label>
                            <input type="checkbox" name="facilities[]" id="facility-{{$facility->id}}" value="{{ $facility->id }}" className="mt-1 px-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" />
                        </div>
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
                    <input type="text" name="city" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="in quale città si trova" value="{{old('city',$apartment->city)}}" />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Indirizzo
                    </span>
                    <input type="text" name="address" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="indirizzo della casa" value="{{old('address',$apartment->address)}}" />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Descrivi la casa
                    </span>
                    <textarea cols={20} rows={5} name="description" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="una breve descrizione dell'abitazione"></textarea>
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Prezzo
                    </span>
                    <input type="text" name="price" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="prezzo in euro per notte" value="{{old('price',$apartment->price)}}" />
                </label>

                <button className="bg-green-700 hover:bg-green-800 text-white rounded-xl py-2 px-6 m-5" type="submit">Modifica</button>
                <a className="bg-blue-500 hover:bg-blue-600 rounded-xl py-2 px-4 m-5" href="{{route('admin.apartment.show',$apartment->id)}}">Torna indietro</a>
            </form>
        </div >
    )
}

export default CreateUpdateHome