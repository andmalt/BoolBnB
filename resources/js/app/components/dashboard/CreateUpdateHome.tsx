import React, { useEffect, useState } from 'react';
import api from '../../services/connection_manager';
import { setDashboardComponents, setIdNumber, setIsCreate } from '../../services/functions';
import { Facilities, House, Regions } from '../../services/interfaces';
import { variablesDashboard } from '../../services/variables';
import { clear, error, loading } from '../../store/authSlice';
import { setDashboard, setIsCte, setNumber } from '../../store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const CreateUpdateHome = () => {
    const [home, setHome] = useState<House | null>(null);
    const [homeFacilities, setHomeFacilities] = useState<Facilities[]>()
    const [facilities, setFacilities] = useState<Facilities[]>();
    const [regions, setRegions] = useState<Regions[]>();
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
    const [checkedState, setCheckedState] = useState(new Array(facilities?.length).fill(false));
    const [facilityChecked, setFacilityChecked] = useState<number[]>();
    const [facChecked, setFacChecked] = useState<Facilities[]>();
    const [title, setTitle] = useState<string | undefined>();
    const authSelector = useAppSelector(state => state.auth)
    const dashSelector = useAppSelector(state => state.dashboard)
    const dispatch = useAppDispatch()

    const getMyHouse = async () => {
        dispatch(loading())
        try {
            if (dashSelector.isCreate == false) {
                const response = await api.getMyHome(authSelector.token, dashSelector.id);
                if (response.data.success) {
                    // console.log("data", response.data);
                    setFacilities(response.data.facilities)
                    setHome(response.data.apartment)
                    setCheckedState(new Array(response.data.facilities.length).fill(false))
                    setTitle(response.data.apartment.title)
                    setRegions(response.data.regions)
                    setAddress(response.data.apartment.address)
                    setBathrooms(response.data.apartment.bathrooms)
                    setBeds(response.data.apartment.beds)
                    setCity(response.data.apartment.city)
                    setDescription(response.data.apartment.description)
                    setPrice(response.data.apartment.price)
                    setRooms(response.data.apartment.rooms)
                    setSquare(response.data.apartment.square)
                    setRegion(response.data.apartment.region)
                    setFacChecked(response.data.apartment.facilities)
                }
            } else {
                const response = await api.getFacReg(authSelector.token);
                if (response.data.success) {
                    // console.log("data", response.data);
                    setFacilities(response.data.facilities)
                    setCheckedState(new Array(response.data.facilities.length).fill(false))
                    setRegions(response.data.regions)
                }
            }

            dispatch(clear())
        } catch (e) {
            console.log("error myhome", e);
            dispatch(error())
        }
    }

    const updateMyHome = async (e: any) => {
        e.preventDefault();
        const confirm = window.confirm('Sei sicuro di voler modificare la casa?');
        if (!confirm) {
            return;
        }
        const page = document.getElementById("body-container");
        page?.scrollIntoView();
        dispatch(loading())
        const data = {
            title,
            address,
            bathrooms,
            beds,
            city,
            description,
            facilities: facilityChecked,
            price,
            region,
            rooms,
            square,
        }
        try {
            if (dashSelector.isCreate == false) {
                const response = api.updateMyHome(authSelector.token, dashSelector.id, data);
                // console.log("resp=",(await response).data);
                if ((await response).data.success) {
                    setDashboardComponents(variablesDashboard.HOUSES);
                    dispatch(setDashboard(variablesDashboard.HOUSES));
                    setIsCreate(false)
                    dispatch(setIsCte(false))
                    setIdNumber(null)
                    dispatch(setNumber(null))
                } else {
                    // console.log("error=",(await response).data.error.message.response.data.errors);
                    let array = []
                    for (const key in (await response).data.error.message.response.data.errors) {
                        array.push((await response).data.error.message.response.data.errors[key]);
                    }
                    // change alert with modal
                    alert(array.length >= 1 ? array : "Non esiste il luogo selezionato")
                }
            } else {
                const response = api.createMyHome(authSelector.token, data);
                // console.log("resp=",(await response).data);
                if ((await response).data.success) {
                    setDashboardComponents(variablesDashboard.HOUSES);
                    dispatch(setDashboard(variablesDashboard.HOUSES));
                    setIsCreate(false)
                    dispatch(setIsCte(false))
                    setIdNumber(null)
                    dispatch(setNumber(null))
                } else {
                    // console.log("error=",(await response).data.error.message.response.data.errors);
                    let array = []
                    for (const key in (await response).data.error.message.response.data.errors) {
                        array.push((await response).data.error.message.response.data.errors[key]);
                    }
                    // change alert with modal
                    alert(array.length >= 1 ? array : "Non esiste il luogo selezionato")
                }
            }
            dispatch(clear())
        } catch (e) {
            console.log("error fetch from apartment form", e);
            dispatch(error())
        }
    }

    const handleInputChange = (position: any) => {
        const updatedCheckedState = checkedState?.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const setMyFacilities = () => {
        let checked = new Array(facilities?.length).fill(false)
        facChecked?.forEach(element => {
            checked[element.id - 1] = true
        });
        setCheckedState(checked)
    }

    const photoPage = () => {
        setDashboardComponents(variablesDashboard.PHOTO);
        dispatch(setDashboard(variablesDashboard.PHOTO));
    }
    const exitPage = () => {
        setDashboardComponents(variablesDashboard.HOUSES);
        dispatch(setDashboard(variablesDashboard.HOUSES));
        setIdNumber(null)
        dispatch(setNumber(null))
    }

    useEffect(() => {
        let newFacilities: number[] = []
        facilities?.filter((item, index) => {
            if (checkedState[index] == true) {
                newFacilities.push(item.id)
            }
        });
        setFacilityChecked(newFacilities)
    }, [checkedState])

    useEffect(() => {
        setMyFacilities()
    }, [authSelector.isLoading])

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
        <div id='main'>
            {
                !dashSelector.isCreate ?
                    <div className='flex flex-col items-end justify-center'>
                        <div className='w-[100%] text-center'>
                            <h2 className='text-white text-2xl font-bold'>Modifica casa</h2>
                        </div>
                        <button onClick={photoPage} className='bg-[#6366f1] hover:bg-[#6365f1d8] text-white rounded-xl py-2 px-4 m-5'>Inserisci e cambia foto</button>
                    </div>
                    :
                    <div className='w-[100%] text-center'>
                        <h2 className='text-white text-2xl font-bold'>Crea una casa</h2>
                    </div>
            }
            <form id="update-apartment" onSubmit={(e) => updateMyHome(e)} >
                {
                    dashSelector.isCreate ?
                        <label className="block mt-3">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                                Titolo
                            </span>
                            <input type={"text"} name="title" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="Titolo di identificazione della casa" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        :
                        null
                }
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Camere
                    </span>
                    <input type={"text"} name="rooms" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="numero di camere" value={rooms} onChange={(e) => setRooms(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Posti letto
                    </span>
                    <input type={"text"} name="beds" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="numero massimo di posti letto" value={beds} onChange={(e) => setBeds(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Bagni
                    </span>
                    <input type={"text"} name="bathrooms" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="numero di bagni" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Metri quadri
                    </span>
                    <input type="text" name="square" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="numero di metri quadri" value={square} onChange={(e) => setSquare(e.target.value)} />
                </label>

                <div className="block mt-5">
                    <span className=" block text-sm font-bold text-[#9ca3af]">
                        Servizi
                    </span>
                    <div className="flex flex-row flex-auto flex-wrap">
                        {
                            facilities?.map((facility, i) => {
                                return (
                                    <div key={i} className="mt-1 px-3 py-2 flex flex-col justify-center items-center">
                                        <label htmlFor={`facility-${facility.id}`} className="block text-sm font-medium text-[#9ca3af]">
                                            {facility.name}
                                        </label>
                                        <input type="checkbox" id={`facility-${facility.id}`} name={facility.name} checked={checkedState[i]} value={facility.id} onChange={() => handleInputChange(i)} className="mt-1 px-2 py-2 bg-[#1d2432] border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Regione
                    </span>
                    <select value={region} onChange={e => setRegion(e.target.value)} name="region" id="region" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1">
                        <option className='hidden' value={region}>
                            {region}
                        </option>
                        {
                            regions?.map((reg, i) => {
                                return (
                                    <option key={i} value={reg.name}>
                                        {reg.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </label>

                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Città
                    </span>
                    <input type="text" name="city" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="in quale città si trova" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Indirizzo
                    </span>
                    <input type="text" name="address" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="indirizzo della casa" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Descrivi la casa
                    </span>
                    <textarea cols={20} rows={5} name="description" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="una breve descrizione dell'abitazione" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
                <label className="block mt-3">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#9ca3af]">
                        Prezzo
                    </span>
                    <input type="text" name="price" className="mt-1 px-3 py-2 bg-[#1d2432] text-white border shadow-sm border-slate-300 placeholder-[#9ca3af] focus:outline-none focus:border-[#6366f1] w-2/3 focus:ring-[#6366f1] block rounded-md sm:text-sm focus:ring-1" placeholder="prezzo in euro per notte" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <button className="bg-[#6366f1] hover:bg-[#6365f1d5] text-white rounded-xl py-2 px-6 m-5" type="submit">Salva</button>
                <button className="bg-[#29303d] hover:bg-[#29303dcd] text-white rounded-xl py-2 px-4 m-5" onClick={exitPage}>Torna indietro</button>
            </form>
        </div >
    )
}

export default CreateUpdateHome;