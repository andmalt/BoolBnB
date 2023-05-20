import React from 'react'
import "../../../../css/dashboard.css"
import { classNames } from '../../services/functions';

interface SponsorshipCardProps {
    name: string;
    price: number;
    duration: number;
    generateToken(): Promise<void>
}

const SponsorshipCard = (props: SponsorshipCardProps) => {
    const { name, price, duration, generateToken } = props;

    return (
        <div className={classNames(name == 'silver' ? 'bg-[rgb(192,192,192)]' : name == 'gold' ? 'bg-[rgb(255,215,0)]' : 'bg-[rgb(229,228,226)]', 'w-[90%] sm:w-[65%] md:w-[40%] lg:w-[30%] p-4 m-2 rounded-md')}>
            <h5 id='stroke-title' className="text-2xl font-bold tracking-tight text-white mb-4">
                {name}
            </h5>
            <p className="font-normal text-gray-600 mb-2">
                ha una durata di <span className='font-bold'>{duration} </span>ore
            </p>
            <p className="font-normal text-gray-600 mb-3">
                costo <span className=' font-bold'>{price}&euro;</span>
            </p>
            <button className='bg-blue-600 w-full flex justify-center items-center flex-wrap mb-2 rounded-md p-2 hover:bg-blue-500 active:bg-green-600' onClick={generateToken}>
                Paga
                <svg
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}

export default SponsorshipCard