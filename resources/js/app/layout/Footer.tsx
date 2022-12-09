import React from 'react'
import "../../../css/footer.css"

const Footer = () => {
    return (
        <div id='footer-container'>
            <div className=" bg-black">
                <div className="max-w-2xl mx-auto text-blue-800 py-4">
                    <div className="text-center">
                        <h3 className="text-3xl mb-4"> Scarica la nostra app</h3>
                        <p> La tua casa. Per sempre. </p>
                        <div className="flex justify-center my-3">
                            <div onClick={() => alert("premuto scarica Google play")} className="flex items-center border border-blue-800 w-auto rounded-lg px-4 py-2 mx-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs text-blue-800'>Scarica su </p>
                                    <p className="text-sm md:text-base"> Google Play Store </p>
                                </div>
                            </div>
                            <div className="flex items-center border border-blue-800 w-auto rounded-lg px-4 py-2 mx-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs text-blue-800'>Scarica su </p>
                                    <p className="text-sm md:text-base"> Apple Store </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                        <p className="order-2 md:order-1 mt-8 md:mt-0 text-blue-800"> &copy; Maltempi Andrea , 2022. </p>
                        <div className="order-1 md:order-2">
                            <span className="px-2 text-blue-800">Chi siamo</span>
                            <span className="px-2 text-blue-800 border-l">Contattaci</span>
                            <span className="px-2 text-blue-800 border-l">Privacy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;