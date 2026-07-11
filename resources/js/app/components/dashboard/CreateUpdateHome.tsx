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
    const [homeFacilities, setHomeFacilities] = useState<Facilities[]>([])
    const [facilities, setFacilities] = useState<Facilities[]>([]);
    const [regions, setRegions] = useState<Regions[]>([]);
    // 
    const [address, setAddress] = useState<string>("");
    const [bathrooms, setBathrooms] = useState<any>();
    const [beds, setBeds] = useState<any>();
    const [city, setCity] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [rooms, setRooms] = useState<any>("");
    const [square, setSquare] = useState<any>("");
    const [region, setRegion] = useState<string>("");
    const [checkedState, setCheckedState] = useState(new Array(facilities?.length).fill(false));
    const [facilityChecked, setFacilityChecked] = useState<number[]>([]);
    const [facChecked, setFacChecked] = useState<Facilities[]>([]);
    const [title, setTitle] = useState<string>("");
    const authSelector = useAppSelector(state => state.auth)
    const dashSelector = useAppSelector(state => state.dashboard)
    const page = document.getElementById("body-container");
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
        const confirm = window.confirm(dashSelector.isCreate ? 'Sei sicuro di voler creare la casa?' : 'Sei sicuro di voler modificare la casa?');
        if (!confirm) {
            return;
        }
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
                const response = await api.updateMyHome(authSelector.token, dashSelector.id, data);
                // console.log("resp=",(await response).data);
                if (response.data.success) {
                    setDashboardComponents(variablesDashboard.HOUSES);
                    dispatch(setDashboard(variablesDashboard.HOUSES));
                    setIsCreate(false)
                    dispatch(setIsCte(false))
                    setIdNumber(null)
                    dispatch(setNumber(null))
                } else {
                    // console.log("error=",(await response).data.error.message.response.data.errors);
                    let array = []
                    for (const key in response.data.error.message.response.data.errors) {
                        array.push(response.data.error.message.response.data.errors[key]);
                    }
                    // change alert with modal
                    alert(array.length >= 1 ? array : "Non esiste il luogo selezionato")
                }
            } else {
                const response = await api.createMyHome(authSelector.token, data);
                // console.log("resp=",(await response).data);
                if (response.data.success) {
                    setDashboardComponents(variablesDashboard.HOUSES);
                    dispatch(setDashboard(variablesDashboard.HOUSES));
                    setIsCreate(false)
                    dispatch(setIsCte(false))
                    setIdNumber(null)
                    dispatch(setNumber(null))
                } else {
                    // console.log("error=",(await response).data.error.message.response.data.errors);
                    let array = []
                    for (const key in response.data.error.message.response.data.errors) {
                        array.push(response.data.error.message.response.data.errors[key]);
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
        <div id='main' className='mx-4 my-4'>
            {
                !dashSelector.isCreate ?
                    <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
                        <h2 className='text-xl font-bold tracking-tight text-heading sm:text-2xl'>Modifica casa</h2>
                        <button onClick={photoPage} className='btn btn-ghost'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>
                            Inserisci e cambia foto
                        </button>
                    </div>
                    :
                    <div className='mb-6'>
                        <h2 className='text-xl font-bold tracking-tight text-heading sm:text-2xl'>Crea una casa</h2>
                    </div>
            }
            <form id="update-apartment" className='card p-6 text-black sm:p-8 dark:text-slate-300' onSubmit={async (e) => await updateMyHome(e)} >
                {
                    dashSelector.isCreate ?
                        <label className="block mt-3">
                            <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                                Titolo
                            </span>
                            <input type={"text"} name="title" className="field-input mt-1.5 w-full max-w-xl" placeholder="Titolo di identificazione della casa" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        :
                        null
                }
                <label className="block mt-3">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Camere
                    </span>
                    <input type={"text"} name="rooms" className="field-input mt-1.5 w-full max-w-xl" placeholder="numero di camere" value={rooms} onChange={(e) => setRooms(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Posti letto
                    </span>
                    <input type={"text"} name="beds" className="field-input mt-1.5 w-full max-w-xl" placeholder="numero massimo di posti letto" value={beds} onChange={(e) => setBeds(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Bagni
                    </span>
                    <input type={"text"} name="bathrooms" className="field-input mt-1.5 w-full max-w-xl" placeholder="numero di bagni" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Metri quadri
                    </span>
                    <input type="text" name="square" className="field-input mt-1.5 w-full max-w-xl" placeholder="numero di metri quadri" value={square} onChange={(e) => setSquare(e.target.value)} />
                </label>

                <div className="block mt-5">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Servizi
                    </span>
                    <div className="flex flex-row flex-auto flex-wrap">
                        {
                            facilities?.map((facility, i) => {
                                return (
                                    <div key={i} className="mt-1 px-3 py-2 flex flex-col justify-center items-center">
                                        <label htmlFor={`facility-${facility.id}`} className="block text-sm font-medium ">
                                            {facility.name}
                                        </label>
                                        <input type="checkbox" id={`facility-${facility.id}`} name={facility.name} checked={checkedState[i]} value={facility.id} onChange={() => handleInputChange(i)} className="mt-1.5 h-4 w-4 rounded border-slate-300 accent-brand-600" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <label className="block mt-3">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Regione
                    </span>
                    <select value={region} onChange={e => setRegion(e.target.value)} name="region" id="region" className="field-input mt-1.5 w-full max-w-xl">
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
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Città
                    </span>
                    <input type="text" name="city" className="field-input mt-1.5 w-full max-w-xl" placeholder="in quale città si trova" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Indirizzo
                    </span>
                    <input type="text" name="address" className="field-input mt-1.5 w-full max-w-xl" placeholder="indirizzo della casa" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label className="block mt-3">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Descrivi la casa
                    </span>
                    <textarea cols={20} rows={5} name="description" className="field-input mt-1.5 w-full max-w-xl" placeholder="una breve descrizione dell'abitazione" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
                <label className="block mt-3">
                    <span className="field-label !mb-0 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Prezzo
                    </span>
                    <input type="text" name="price" className="field-input mt-1.5 w-full max-w-xl" placeholder="prezzo in euro per notte" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <div className='mt-8 flex flex-wrap gap-3'>
                    <button className="btn btn-primary !px-8" type="submit">Salva</button>
                    <button className="btn btn-ghost" onClick={exitPage}>Torna indietro</button>
                </div>
            </form>
        </div >
    )
}

export default CreateUpdateHome;