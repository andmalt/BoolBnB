import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../css/home.css"

const Main = () => {

    const navigate = useNavigate();

    const goToHomes = () => {
        navigate("/homes")
    }

    return (
        <div className='h-full w-full flex flex-row justify-center items-center'>
            <div id='house-container' className='xl:py-28 py-16 bg-slate-100 dark:bg-[#111827] w-full h-full'>
                <div id='small-container' className="container lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl h-96 rounded-md m-auto animate-enter">
                    <div className="sm:ml-20 text-center sm:text-left p-6 font-sans">
                        <h1 className="text-5xl font-bold mb-4 text-white">
                            Cerca la tua casa <br />
                            ovunque.
                        </h1>
                        <p className="text-lg inline-block sm:block text-[#9ca3af]">Cerca casa selezionando la città o la regione di cui sei interessato.</p>
                        <button onClick={() => goToHomes()} className="transition ease-out delay-150 hover:-translate-y-2 mt-8 px-10 py-2 bg-[#29303d] hover:bg-[#29303dd4] text-white active:bg-[#6366f1]">Cerca casa</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;