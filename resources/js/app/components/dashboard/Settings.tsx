import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clear, error, loading, logout } from '../../store/authSlice';
import api from '../../services/connection_manager';
import { convertInputForm, deleteLocalStorage } from '../../services/functions';
import { setIsEmailVerification } from '../../store/emailVerificationSlice';
import { useNavigate } from 'react-router-dom';

interface SettingsProps {

}

const Settings = (props: SettingsProps) => {
    const { } = props;
    const [photo, setPhoto] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const authSelector = useAppSelector(state => state.auth);
    const page = document.getElementById("body-container");

    // function that checks if the user has verified the email
    const emailVerification = async () => {
        dispatch(loading())
        try {
            const response = await api.emailVerification(authSelector.token)
            if (response.data.success) {
                dispatch(setIsEmailVerification(true))
            } else {
                dispatch(setIsEmailVerification(false))
            }
            dispatch(clear())
        } catch (e) {
            console.log("emailVerification", e);
            dispatch(error())
        }
    }

    // function that obtains the user's personal details
    const getUserDetails = async () => {
        page?.scrollIntoView();
        dispatch(loading())
        try {
            const response = await api.getUser(authSelector.token)
            if (response.data.success) {
                const user = response.data.user;
                setName(user.name);
                setSurname(user.surname);
                setEmail(user.email);
                setPhoto(user.avatar_url || "");
                emailVerification();
            }
            dispatch(clear())
        } catch (e) {
            console.log("Error getUser", e);
            dispatch(error())
        }
    }

    const changeInfo = async (e: any) => {
        e.preventDefault()
        page?.scrollIntoView();
        dispatch(loading())
        const data = {
            name: convertInputForm(name),
            surname: convertInputForm(surname),
            email,
        }
        try {
            const response = await api.setUser(authSelector.token, data)
            if (response.data.success) {
                toast.success("Le tue info sono state cambiate con successo!", {
                    position: 'top-right',
                    autoClose: 3000,
                });
                getUserDetails()
            }
            dispatch(clear())
        } catch (e) {
            console.log("Error change info", e);
            dispatch(error())
        }
    }

    const changePassword = async (e: any) => {
        e.preventDefault()
        page?.scrollIntoView();
        dispatch(loading())
        const data = {
            oldpassword: currentPassword,
            password: newPassword,
            password_confirmation: confirmNewPassword,
        }
        try {
            if (newPassword == confirmNewPassword) {
                const response = await api.changeUserPassword(authSelector.token, data)
                if (response.data.success) {
                    toast.success("La tua password è stata sostituita con successo!", {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    setCurrentPassword("")
                    setNewPassword("")
                    setConfirmNewPassword("")
                }
            } else {
                toast.error("La tue nuove password non corrispondono", {
                    position: 'top-right',
                    autoClose: 3000,
                })
            }
            dispatch(clear())
        } catch (e) {
            console.log("Error change password", e);
            dispatch(error())
        }
    }

    const handleFileChange = async (e: any) => {
        // console.log("fileList=", e.target.files);
        setFile(e.target.files[0]);
        toast.info("Hai inserito una foto adesso puoi salvarla!", {
            position: 'top-right',
            autoClose: 3000,
        });
    };


    const sendPhotos = async (e: any) => {
        e.preventDefault()
        const confirm = window.confirm('Sicuro di voler inserire la foto?');
        if (!confirm) {
            return;
        }
        if (!file) {
            return;
        }
        dispatch(loading())
        const data = new FormData()
        data.append(`image`, file)
        try {
            const response = await api.updateUserPhotos(authSelector.token, data);
            if (response.data.success) {
                getUserDetails()
                toast.success("La foto è stata salvata con successo!", {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                toast.warning("La foto non è stata salvata!", {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (e) {
            console.log("Error sendUserPhoto", e);
            dispatch(error())
        }
        // console.log("data=", data);      
        // console.log("response=", response);
        dispatch(clear())
    }

    const deletePhoto = async (e: any) => {
        e.preventDefault()
        const confirm = window.confirm('Sicuro di voler cancellare la foto?');
        if (!confirm) {
            return;
        }
        // console.log("data=", data);
        const response = await api.deleteUserPhotos(authSelector.token);
        if (response.data.success) {
            getUserDetails()
        }
        // console.log("response=", response);
        dispatch(clear())
    }

    const destroyAccount = async (e: any) => {
        e.preventDefault()
        const confirm = window.confirm("Sicuro di voler cancellare l'account?");
        if (!confirm) {
            return;
        }
        try {
            const response = await api.deleteAccount(authSelector.token)
            if (response.status === 200) {
                toast.warning("Il tuo account è stato cancellato correttamente!", {
                    position: 'top-right',
                    autoClose: 5000,
                });
                dispatch(logout())
                deleteLocalStorage()
                navigate("/")
            }
        } catch (e) {
            dispatch(error())
            console.log("Error delete account", e);
        }
    }

    useEffect(() => {
        page?.scrollIntoView();
        let isMount = true;
        if (isMount) {
            getUserDetails()
        }
        return () => {
            isMount = false;
        }
    }, [])

    return (
        <div className='mx-4 flex flex-col text-black dark:text-white'>
            {/* start Personal information */}
            <div className='flex flex-row flex-wrap border-b border-slate-200/80 dark:border-white/10 py-12'>
                <div className='flex flex-col p-4 md:w-1/3'>
                    <h4 className='font-bold text-xl mb-2'>Informazioni Personali</h4>
                    <p className='text-sm text-muted'>Usa un indirizzo valido dove poter ricevere le email.</p >
                    <p className='text-sm text-muted'>Per sostituire la foto premi su di essa e poi premi "Salva immagine".</p >
                </div>
                <div className='md:px-4 flex flex-col md:w-2/3'>
                    <div className='mb-8 flex flex-col'>
                        <form method="post" onSubmit={(e) => sendPhotos(e)}>
                            <span className='block'>
                                <label className='flex h-36 w-36 flex-col flex-wrap items-start'>
                                    <input type="file" name="image" id="image" className='hidden' onChange={handleFileChange} />
                                </label>
                                <button type="submit" className='btn btn-ghost my-1 flex-col !items-start gap-2 !p-2'>
                                    <img className='h-36 w-36 cursor-pointer rounded-xl object-cover' src={!photo ? "./default-user/user.png" : photo} alt="Avatar" />
                                    Salva immagine
                                </button>
                            </span>

                        </form>
                        <div className='flex flex-col flex-wrap items-start gap-1'>
                            <button onClick={(e) => deletePhoto(e)} className='btn my-1 bg-red-500/10 !text-red-600 hover:bg-red-500/20 dark:!text-red-400'>Cancella immagine</button>
                            <p className='text-xs text-muted'>JPG, GIF, PNG, JPEG or SVG, 2MB max.</p>
                        </div>
                    </div>
                    <form method='POST' onSubmit={(e) => changeInfo(e)}>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="name" className='field-label'>Nome</label>
                            <input type="text" name="name" id="name" className='field-input' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="surname" className='field-label'>Cognome</label>
                            <input type="text" name="surname" id="surname" className='field-input' value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="email" className='field-label'>Indirizzo Email</label>
                            <input type="email" name="email" id="email" className='field-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <button className='btn btn-primary' type="submit">Salva</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* finish Personal information */}

            {/* start change password */}
            <div className='flex flex-row flex-wrap border-b border-slate-200/80 dark:border-white/10 py-12'>
                <div className='flex flex-col p-4 md:w-1/3'>
                    <h4 className='font-bold text-xl mb-2'>Cambia Password</h4>
                    <p className='text-sm text-muted'>Aggiorna la tua password associata al tuo account.</p>
                </div>
                <form method='POST' onSubmit={(e) => changePassword(e)} className='md:px-4 flex flex-col md:w-2/3'>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="current-password" className='field-label'>Password attuale</label>
                        <input type="password" name="current_password" id="current-password" className='field-input' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="new-password" className='field-label'>Nuova password</label>
                        <input type="password" name="new_password" id="new-password" className='field-input' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="confirm-new-password" className='field-label'>Conferma nuova password</label>
                        <input type="password" name="confirm_new_password" id="confirm-new-password" className='field-input' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-primary' type="submit">Salva</button>
                    </div>
                </form>
            </div>
            {/* finish change password */}

            {/* start delete account */}
            <div className='flex flex-row flex-wrap py-16'>
                <div className='flex flex-col p-4 md:w-1/3'>
                    <h4 className='font-bold text-xl mb-2'>Cancella account</h4>
                    <p className='text-sm text-muted'>Non vuoi più utilizzare il nostro servizio? Puoi eliminare il tuo account qui. Questa azione non è reversibile. Tutte le informazioni relative a questo account verranno eliminate in modo permanente.</p>
                </div>
                <form method='POST' className='md:px-4 flex flex-col md:w-2/3'>
                    <div>
                        <button onClick={(e) => destroyAccount(e)} className='btn bg-red-600 text-white shadow-sm shadow-red-600/25 hover:bg-red-500' type="submit">Cancella il mio account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings;