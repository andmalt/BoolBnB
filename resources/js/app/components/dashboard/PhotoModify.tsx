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

  const getMyPhotos = async () => {
    dispatch(loading())
    try {
      const response = await api.getMyHome(authSelector.token, dashSelector.id);
      if (response.data.success) {
        // console.log("data", response.data);
        setPhotos(response.data.apartment.photos)
      }
      dispatch(clear())
    } catch (e) {
      console.log("error myhome", e);
      dispatch(error())
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const sendPhotos = (e: any) => {
    e.preventDefault()
    if (!fileList) {
      return;
    }
    const data = new FormData()
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    console.log("data=", data);
  }

  const updatePage = () => {
    setDashboardComponents(variablesDashboard.CREATE_UPDATE);
    dispatch(setDashboard(variablesDashboard.CREATE_UPDATE));
  }

  const files = fileList ? [...fileList] : [];

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
                <div key={i} className="rounded-sm m-1 w-2/5 overflow-hidden flex">
                  <img src={photo?.image_url} className="" alt={`image ${photo?.id}`} />
                </div>
              )
            })
            :
            <div className="duration-700 ease-in-out">
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