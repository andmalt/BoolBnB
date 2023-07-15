import React from 'react'
import "../../../css/footer.css"
import { Switcher } from '../components';

const Footer = () => {
    return (
        <div id='footer-container' className='dark:bg-[#0a121e] bg-slate-200'>
            <div className="pt-3">
                <div className="max-w-2xl mx-auto dark:text-white text-black py-4 pl-12 md:pl-0">
                    <div className="text-center">
                        <h3 className="text-3xl mb-4"> Scarica la nostra app</h3>
                        <div className="flex flex-wrap justify-center my-3 dark:text-[#9ca3af] text-black">
                            <div onClick={() => alert("premuto Google play Store")} className="mb-4 sm:mb-0 flex cursor-pointer items-center border border-[#29303d] w-auto rounded-lg px-4 py-2 mx-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs'>Scarica su </p>
                                    <p className="text-sm md:text-base"> Google Play Store </p>
                                </div>
                            </div>
                            <div onClick={() => alert("premuto Apple Store")} className="mb-4 sm:mb-0 flex cursor-pointer items-center border border-[#29303d] w-auto rounded-lg px-4 py-2 mx-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs'>Scarica su </p>
                                    <p className="text-sm md:text-base"> Apple Store </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center text-sm dark:text-[#9ca3af] text-black">
                        <p className="order-3 md:order-1 mt-8 md:mt-0 "> &copy; Maltempi Andrea , 2022. </p>
                        <div className='px-10 py-4 flex flex-row justify-end order-2'>
                            <div className='flex flex-col justify-center'>
                                <div className='flex flex-row justify-between items-center py-3'>
                                    <p>Cambia tema</p>
                                </div>
                                <Switcher />
                            </div>
                        </div>
                        <div className="order-1 md:order-3">
                            <span className="px-2">Chi siamo</span>
                            <span className="px-2 border-l">Contattaci</span>
                            <span className="px-2 border-l">Privacy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;