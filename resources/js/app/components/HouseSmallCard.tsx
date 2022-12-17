import React, { useEffect } from 'react'
import { Photos } from '../views/Homes';

interface HouseCard {
    photo?: Photos[]
    title: string,
    description: string
}

const HouseSmallCard = (props: HouseCard) => {
    const { photo, title, description } = props;

    useEffect(() => {
        console.log(photo);
    }, [])

    return (
        <div className="p-1 sm:flex space-x-6 bg-black bg-opacity-50 shadow-xl rounded-2xl">
            {/* <img src="https://tailus.io/sources/blocks/twocards/preview/images/woman.jpg" alt="art cover" loading="lazy" width="1000" height="667" className="h-56 sm:h-full w-full sm:w-5/12 object-cover object-top rounded-lg transition duration-500 group-hover:rounded-xl" /> */}
            <div className="max-w-2xl mx-auto">
                <div id="default-carousel" className="relative">
                    { /* Carousel wrapper  */}
                    <div className="overflow-hidden relative h-56 w-96 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                        {/* Item */}
                        {/* fixed photos */}
                        {
                            photo != undefined ?
                                photo?.map(el => {
                                    return (
                                        <div key={el.id} className="duration-700 ease-in-out">
                                            <img src={el.image_url} className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt={`photo ${el.id}`} />
                                        </div>
                                    )
                                })
                                :
                                <div className="duration-700 ease-in-out">
                                    <img src="https://tailus.io/sources/blocks/twocards/preview/images/woman.jpg" className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." />
                                </div>
                        }
                    </div>
                    {/* Slider indicators */}
                    {/* <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                        <button type="button" className="w-3 h-3 rounded-full bg-black"></button>
                    </div> */}
                    {/* Slider controls */}
                    <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
                        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/30  hover:bg-black/50 focus:ring-4 focus:ring-white focus:outline-none">
                            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            <span className="hidden">Previous</span>
                        </span>
                    </button>
                    <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
                        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/30 hover:bg-black/50 focus:ring-4 focus:ring-white focus:outline-none">
                            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            <span className="hidden">Next</span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="sm:w-7/12 pl-0 p-5">
                <div className="space-y-2">
                    <div className="space-y-4">
                        <h4 className="text-2xl font-semibold text-cyan-900">{title}</h4>
                        <p className="text-gray-600">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HouseSmallCard;