import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clear, error, loading, logout } from '../../store/authSlice';
import api from '../../services/connection_manager';
import { convertInputForm, deleteLocalStorage } from '../../services/functions';
import { setIsEmailVerification } from '../../store/emailVerificationSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SettingsProps {

}

const Settings = (props: SettingsProps) => {
    const { } = props;
    const { t } = useTranslation();
    const [photo, setPhoto] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
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
                toast.success(t("dash.settings.infoChanged"), {
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
                    toast.success(t("dash.settings.passwordChanged"), {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    setCurrentPassword("")
                    setNewPassword("")
                    setConfirmNewPassword("")
                }
            } else {
                toast.error(t("dash.settings.passwordsMismatch"), {
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
        const selected = e.target.files[0];
        if (!selected) {
            return;
        }
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        toast.info(t("dash.settings.photoSelected"), {
            position: 'top-right',
            autoClose: 3000,
        });
    };


    const sendPhotos = async (e: any) => {
        e.preventDefault()
        const confirm = window.confirm(t("dash.settings.confirmSavePhoto"));
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
                setFile(null)
                setPreview("")
                getUserDetails()
                toast.success(t("dash.settings.photoSaved"), {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                toast.warning(t("dash.settings.photoNotSaved"), {
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
        const confirm = window.confirm(t("dash.settings.confirmDeletePhoto"));
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
        const confirm = window.confirm(t("dash.settings.confirmDeleteAccount"));
        if (!confirm) {
            return;
        }
        try {
            const response = await api.deleteAccount(authSelector.token)
            if (response.status === 200) {
                toast.warning(t("dash.settings.accountDeleted"), {
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
                    <h4 className='font-bold text-xl mb-2'>{t("dash.settings.personalInfo")}</h4>
                    <p className='text-sm text-muted'>{t("dash.settings.personalInfoDesc1")}</p >
                    <p className='text-sm text-muted'>{t("dash.settings.personalInfoDesc2")}</p >
                </div>
                <div className='md:px-4 flex flex-col md:w-2/3'>
                    <div className='mb-8'>
                        <form method="post" onSubmit={(e) => sendPhotos(e)}>
                            <div className='flex flex-wrap items-center gap-6'>
                                {/* avatar preview (shows the newly selected file before saving) */}
                                <div className='relative'>
                                    <img className='h-28 w-28 rounded-2xl border border-slate-200/80 object-cover shadow-sm dark:border-white/10' src={preview ? preview : (!photo ? "./default-user/user.png" : photo)} alt="Avatar" />
                                    {
                                        preview ?
                                            <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            :
                                            null
                                    }
                                </div>

                                <div className='flex flex-col items-start gap-3'>
                                    <div className='flex flex-wrap gap-2'>
                                        {/* opens the file picker */}
                                        <label htmlFor='image' className='btn btn-ghost cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                            {t("dash.settings.uploadImage")}
                                            <input type="file" accept="image/*" name="image" id="image" className='hidden' onChange={handleFileChange} />
                                        </label>
                                        {/* saves the selected file */}
                                        <button type="submit" disabled={!file} className='btn btn-primary'>
                                            {t("dash.settings.saveImage")}
                                        </button>
                                        <button type='button' onClick={(e) => deletePhoto(e)} className='btn bg-red-500/10 !text-red-600 hover:bg-red-500/20 dark:!text-red-400'>{t("dash.settings.deleteImage")}</button>
                                    </div>
                                    <p className='text-xs text-muted'>
                                        {
                                            file ?
                                                <>{t("dash.settings.newImageSelected")} <span className='font-semibold text-heading'>{file.name}</span></>
                                                :
                                                t("dash.settings.imageHint")
                                        }
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <form method='POST' onSubmit={(e) => changeInfo(e)}>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="name" className='field-label'>{t("dash.settings.name")}</label>
                            <input type="text" name="name" id="name" className='field-input' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="surname" className='field-label'>{t("dash.settings.surname")}</label>
                            <input type="text" name="surname" id="surname" className='field-input' value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="email" className='field-label'>{t("dash.settings.emailAddress")}</label>
                            <input type="email" name="email" id="email" className='field-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <button className='btn btn-primary' type="submit">{t("dash.settings.save")}</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* finish Personal information */}

            {/* start change password */}
            <div className='flex flex-row flex-wrap border-b border-slate-200/80 dark:border-white/10 py-12'>
                <div className='flex flex-col p-4 md:w-1/3'>
                    <h4 className='font-bold text-xl mb-2'>{t("dash.settings.changePassword")}</h4>
                    <p className='text-sm text-muted'>{t("dash.settings.changePasswordDesc")}</p>
                </div>
                <form method='POST' onSubmit={(e) => changePassword(e)} className='md:px-4 flex flex-col md:w-2/3'>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="current-password" className='field-label'>{t("dash.settings.currentPassword")}</label>
                        <input type="password" name="current_password" id="current-password" className='field-input' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="new-password" className='field-label'>{t("dash.settings.newPassword")}</label>
                        <input type="password" name="new_password" id="new-password" className='field-input' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="confirm-new-password" className='field-label'>{t("dash.settings.confirmNewPassword")}</label>
                        <input type="password" name="confirm_new_password" id="confirm-new-password" className='field-input' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-primary' type="submit">{t("dash.settings.save")}</button>
                    </div>
                </form>
            </div>
            {/* finish change password */}

            {/* start delete account */}
            <div className='flex flex-row flex-wrap py-16'>
                <div className='flex flex-col p-4 md:w-1/3'>
                    <h4 className='font-bold text-xl mb-2'>{t("dash.settings.deleteAccount")}</h4>
                    <p className='text-sm text-muted'>{t("dash.settings.deleteAccountDesc")}</p>
                </div>
                <form method='POST' className='md:px-4 flex flex-col md:w-2/3'>
                    <div>
                        <button onClick={(e) => destroyAccount(e)} className='btn bg-red-600 text-white shadow-sm shadow-red-600/25 hover:bg-red-500' type="submit">{t("dash.settings.deleteAccountBtn")}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings;