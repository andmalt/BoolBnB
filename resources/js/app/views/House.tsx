import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../services/connection_manager';
import { clear, error, loading } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';
import { House , Photos } from './Homes';

interface HouseProps{

}

const defaultPhoto: Photos = {
    id: 0,
    apartment_id: 0,
    image_url: 'https://tailus.io/sources/blocks/twocards/preview/images/woman.jpg'
}

const House = (props:HouseProps) => {
    const {} = props;
    const params = useParams();
    const houseId = params.houseId;
    const [home, setHome] = useState<House | null>(null);
    const [lengthPhotos, setLengthPhotos] = useState<number>(0);
    const [numberPhoto, setNumberPhoto] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [photos, setPhotos] = useState<Photos[]>();
    const [photo, setPhoto] = useState<Photos|null>(null);
    const dispatch = useAppDispatch();

    const getHome = async ()=> {
        dispatch(loading())
        try {
            const response = await api.getHome(houseId)
            if(response.data.success){
                setHome(response.data.apartment[0])
                setPhoto(response.data.apartment[0].photos[0])
                setPhotos(response.data.apartment[0].photos)
                setLengthPhotos(response.data.apartment[0].photos.length)
                dispatch(clear())
            }
        } catch (e) {
            console.log("error House getHome:", e);
            dispatch(error())
        }
    }

    const nextImage = () => {
        if (count == lengthPhotos - 1) {
            setCount(0)
        } else {
            setCount(count + 1)
            setNumberPhoto(numberPhoto + 1)
        }
    }

    const previousImage = () => {
        if (count == 0) {
            setCount(lengthPhotos - 1)
        } else {
            setCount(count - 1)
            setNumberPhoto(numberPhoto - 1)
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
        getPhoto(count)
    }, [count])

    useEffect(()=>{
        let isMount = true
        if(isMount){
            getHome();
        }
        return ()=> {isMount = false};
    },[]);

    return (
        <div className='text-white'>
            <h1>House {home?.id} {home?.title}</h1>
            <div className="overflow-hidden relative rounded-lg h-60 md:h-64 xl:h-72 w-72 md:w-72 xl:w-80">
            {/* Item */}
            {/* fixed photos */}
            {
                photos?.length != 0 ?
                    <div className="duration-700 ease-in-out">
                        <img src={photo?.image_url} className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt={`image ${photo?.id}`} />
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
            </div>
        </div>
    )
}

export default House;