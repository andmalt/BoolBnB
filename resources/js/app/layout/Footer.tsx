import React from 'react'
import "../../../css/footer.css"

const Footer = () => {
    return (
        <div id='footer-container'>
            <div className=" bg-[#0a121e] pt-3">
                <div className="max-w-2xl mx-auto text-white py-4">
                    <div className="text-center">
                        <h3 className="text-3xl mb-4"> Scarica la nostra app</h3>
                        <div className="flex justify-center my-3 text-[#9ca3af]">
                            <div onClick={() => alert("premuto Google play Store")} className="flex cursor-pointer items-center border border-[#29303d] w-auto rounded-lg px-4 py-2 mx-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs'>Scarica su </p>
                                    <p className="text-sm md:text-base"> Google Play Store </p>
                                </div>
                            </div>
                            <div onClick={() => alert("premuto Apple Store")} className="flex cursor-pointer items-center border border-[#29303d] w-auto rounded-lg px-4 py-2 mx-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs'>Scarica su </p>
                                    <p className="text-sm md:text-base"> Apple Store </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col md:flex-row md:justify-between items-center text-sm text-[#9ca3af]">
                        <p className="order-2 md:order-1 mt-8 md:mt-0 "> &copy; Maltempi Andrea , 2022. </p>
                        <div className="order-1 md:order-2">
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