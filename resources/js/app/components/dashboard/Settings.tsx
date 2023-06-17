import React from 'react'

const Settings = () => {
    return (
        <div className='text-white flex flex-col'>
            {/* start Personal information */}
            <div className='flex flex-row flex-wrap border-b-2 border-[rgb(41,48,61)] py-16'>
                <div className='flex flex-col p-4 md:w-1/3'>
                    <h4 className='font-bold text-xl mb-2'>Informazioni Personali</h4>
                    <p>Usa un indirizzo valido dove poter ricevere le email.</p>
                </div>
                <form method='POST' className='md:px-4 flex flex-col md:w-2/3'>
                    <div className='flex flex-col mb-6'>
                        <img className='rounded-lg h-36 w-36' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="#" />
                        <div>
                            <button onClick={(e) => { e.preventDefault() }} className='rounded-lg py-2 px-4 my-1 bg-[rgb(41,48,61)] hover:bg-[rgb(51,58,71)]'>Cambia immagine</button>
                            <p>JPG, GIF, PNG, JPEG or SVG, 10MB max.</p>
                        </div>
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="name" className='font-bold'>Nome</label>
                        <input type="text" name="name" id="name" className='rounded-lg' />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="surname" className='font-bold'>Cognome</label>
                        <input type="text" name="surname" id="surname" className='rounded-lg' />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="email" className='font-bold'>Indirizzo Email</label>
                        <input type="email" name="email" id="email" className='rounded-lg' />
                    </div>
                    <div>
                        <button onClick={(e) => { e.preventDefault() }} className='bg-[#6366f1] hover:bg-[rgb(109,112,251)] rounded-lg py-2 px-4' type="submit">Salva</button>
                    </div>
                </form>
            </div>
            {/* finish Personal information */}

            {/* start change password */}
            <div className='flex flex-row flex-wrap border-b-2 border-[rgb(41,48,61)] py-16'>
                <div className='flex flex-col p-4 md:w-1/3'>
                    <h4 className='font-bold text-xl mb-2'>Cambia Password</h4>
                    <p>Aggiorna la tua password associata al tuo account.</p>
                </div>
                <form method='POST' className='md:px-4 flex flex-col md:w-2/3'>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="current-password" className='font-bold'>Password attuale</label>
                        <input type="password" name="current_password" id="current-password" className='rounded-lg' />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="new-password" className='font-bold'>Nuova password</label>
                        <input type="password" name="new_password" id="new-password" className='rounded-lg' />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="confirm-new-password" className='font-bold'>Conferma nuova password</label>
                        <input type="password" name="confirm_new_password" id="confirm-new-password" className='rounded-lg' />
                    </div>
                    <div>
                        <button onClick={(e) => { e.preventDefault() }} className='bg-[#6366f1] hover:bg-[rgb(109,112,251)] rounded-lg py-2 px-4' type="submit">Salva</button>
                    </div>
                </form>
            </div>
            {/* finish change password */}

            {/* start delete account */}
            <div className='flex flex-row flex-wrap py-16'>
                <div className='flex flex-col p-4 md:w-1/3'>
                    <h4 className='font-bold text-xl mb-2'>Cancella account</h4>
                    <p>Non vuoi più utilizzare il nostro servizio? Puoi eliminare il tuo account qui. Questa azione non è reversibile. Tutte le informazioni relative a questo account verranno eliminate in modo permanente.</p>
                </div>
                <form method='POST' className='md:px-4 flex flex-col md:w-2/3'>
                    <div>
                        <button onClick={(e) => { e.preventDefault() }} className='bg-[#ef4444] hover:bg-[rgb(259,88,88)] rounded-lg py-2 px-4' type="submit">Cancella il mio account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings;