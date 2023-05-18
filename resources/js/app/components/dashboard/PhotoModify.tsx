import React, { ChangeEvent, useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { setDashboardComponents } from '../../services/functions';
import { Photos } from '../../services/interfaces';
import { variablesDashboard } from '../../services/variables';
import { clear, error, loading } from '../../store/authSlice';
import { setDashboard } from '../../store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const PhotoModify = () => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [photos, setPhotos] = useState<Photos[] | null>(null);
  const authSelector = useAppSelector(state => state.auth);
  const dashSelector = useAppSelector(state => state.dashboard);
  const dispatch = useAppDispatch();
  const files = fileList ? [...fileList] : [];

  const getMyPhotos = async () => {
    dispatch(loading())
    try {
      const response = await api.getMyHome(authSelector.token, dashSelector.id);
      if (response.data.success) {
        // console.log("data", response.data);
        setPhotos(response.data.apartment.photos)
        // console.log("photos=", response.data.apartment.photos);

      }
      dispatch(clear())
    } catch (e) {
      console.log("error myhome", e);
      dispatch(error())
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("fileList=", e.target.files);
    setFileList(e.target.files);
  };

  const sendPhotos = async (e: any) => {
    e.preventDefault()
    const confirm = window.confirm('Sicuro di voler inserire la/le foto?');
    if (!confirm) {
      return;
    }
    if (!fileList) {
      return;
    }
    dispatch(loading())
    const data = new FormData()
    files.forEach((file, i) => {
      data.append(`image-${i + 1}`, file)
    });
    // console.log("data=", data);
    const response = await api.updatePhotos(authSelector.token, dashSelector.id, data);
    if (response.data.success) {
      getMyPhotos()
    }
    // console.log("response=", response);
    dispatch(clear())
  }

  const deletePhotos = async (e: any, id: number) => {
    e.preventDefault()
    const confirm = window.confirm('Sicuro di voler cancellare la foto?');
    if (!confirm) {
      return;
    }
    dispatch(loading())
    const response = await api.deletePhotos(authSelector.token, id);
    if (response.data.success) {
      getMyPhotos()
    }
    dispatch(clear())
  }

  const updatePage = () => {
    setDashboardComponents(variablesDashboard.CREATE_UPDATE);
    dispatch(setDashboard(variablesDashboard.CREATE_UPDATE));
  }


  useEffect(() => {
    let isMount = true;
    if (isMount) {
      getMyPhotos()
    }
    return () => {
      isMount = false
    }
  }, [])

  return (
    <div>
      <div className='mb-12'>
        <button onClick={updatePage} className=' bg-gray-600 hover:bg-blue-600 rounded-xl py-2 px-8 m-5' type="submit">Indietro</button>
      </div>
      <div id='container-photos' className='flex flex-row flex-wrap justify-start items-center'>
        {
          photos?.length != 0 && photos != undefined ?
            photos.map((photo, i) => {
              return (
                <div key={i} className="rounded-sm m-1 w-2/5 overflow-hidden flex relative">
                  <div onClick={(e) => deletePhotos(e, photo.id)} className='absolute top-3 right-2 w-8 h-8 rounded-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center hover:bg-[rgba(0,0,0,1)]'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                  <img src={photo?.image_url.includes("https://") ||
                    photo?.image_url.includes("http://") ? photo?.image_url : `/storage/apartments/images/${photo?.image_url}`
                  } className="" alt={`image ${photo?.id}`} />
                </div>
              )
            })
            :
            <div className="duration-700 ease-in-out flex">
              <img src="https://tailus.io/sources/blocks/twocards/preview/images/woman.jpg" className="" alt="..." />
            </div>
        }
      </div>
      <form onSubmit={(e) => sendPhotos(e)}>
        <label className="mt-3 block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Foto
          </span>
          <input type={"file"} name="images" className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" onChange={handleFileChange} multiple />
        </label>
        <button className='bg-green-500 hover:bg-blue-600 rounded-xl py-2 px-4 m-5' type="submit">Inserisci foto</button>
      </form>
    </div>
  )
}

export default PhotoModify;