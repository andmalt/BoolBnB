import React, { ChangeEvent, useEffect, useState } from 'react'
import api from '../../services/connection_manager';
import { setDashboardComponents } from '../../services/functions';
import { Photos } from '../../services/interfaces';
import { variablesDashboard } from '../../services/variables';
import { clear, error, loading } from '../../store/authSlice';
import { setDashboard } from '../../store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toast } from 'react-toastify';

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
      toast.error("Inserisci almeno una foto!", {
        position: 'top-right',
        autoClose: 3000,
      });
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
      toast.success("Le foto sono state salvate con successo!", {
        position: 'top-right',
        autoClose: 3000,
      });
      getMyPhotos()
    } else {
      toast.error("Le foto non sono state salvate per un errore!", {
        position: 'top-right',
        autoClose: 3000,
      });
    }
    // console.log("response=", response);
    setFileList(null)
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
    <div className='mx-4 my-4'>
      <div className='mb-8 flex flex-wrap items-center justify-between gap-3'>
        <h2 className='text-xl font-bold tracking-tight text-heading sm:text-2xl'>Foto della casa</h2>
        <button onClick={updatePage} className='btn btn-ghost' type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Indietro
        </button>
      </div>
      <div id='container-photos' className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {
          photos?.length != 0 && photos != undefined ?
            photos.map((photo, i) => {
              return (
                <div key={i} className="group relative aspect-video overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm dark:border-white/10">
                  <img src={photo?.url ?? photo?.image_url} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" alt={`image ${photo?.id}`} />
                  <button type='button' title='Cancella foto' onClick={(e) => deletePhotos(e, photo.id)} className='absolute right-2 top-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-ink-950/60 backdrop-blur transition hover:bg-red-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              )
            })
            :
            <div className="card flex aspect-video items-center justify-center">
              <p className='text-sm text-muted'>Nessuna foto caricata</p>
            </div>
        }
      </div>
      <form onSubmit={(e) => sendPhotos(e)} className='card mt-8 p-6'>
        <span className="field-label after:ml-0.5 after:text-red-500 after:content-['*']">
          Foto
        </span>
        <div className='mt-3 flex flex-row flex-wrap items-center gap-3'>
          <label className="block">
            <span className='btn btn-ghost cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Inserisci foto
              <input type={"file"} name="images" className="hidden" onChange={handleFileChange} multiple />
            </span>
          </label>
          <span className='text-sm text-heading'>
            {
              fileList?.length! > 0 && fileList?.length != undefined ?
                <p>Hai inserito {fileList?.length} foto</p>
                :
                null
            }
          </span>
        </div>
        <button className='btn btn-primary mt-6 !px-8' type="submit">Salva</button>
      </form>
    </div>
  )
}

export default PhotoModify;