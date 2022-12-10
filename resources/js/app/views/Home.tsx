import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../../css/home.css"

const Home = () => {

    const [isMounted, setIsMounted] = useState<boolean>(true);

    useEffect(() => {
        if (isMounted) {

        }
        return () => setIsMounted(false)
    }, []);

    return (
        <>
            <div id='house-container' className='xl:py-28 py-16'>
                <div id='small-container' className="container lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto h-96 rounded-md flex items-center">
                    <div className="sm:ml-20 text-center sm:text-left text-blue-800 font-sans">
                        <h1 className="text-5xl font-bold mb-4">
                            Cerca le tua casa <br />
                            ovunque.
                        </h1>
                        <p className="text-lg inline-block sm:block">Cerca casa selezionando la città o la regione in cui vorresti la nuova abitazione.</p>
                        <button className="transition ease-in-out delay-300 hover:-translate-y-2 mt-8 px-4 py-2 bg-black hover:bg-blue-800 hover:text-black border-blue-800 rounded border-2">Cerca case</button>
                    </div>
                </div>
            </div>
            <div id='black-space'></div>
        </>
    )
}

export default Home;