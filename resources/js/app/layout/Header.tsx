import React, { useEffect, useState } from 'react';
import '../../../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/connection_manager';
import { useAppDispatch, useAppSelector } from '../util/hooks';
import { clear, logout, loading, error } from '../util/authSlice';

export interface HeaderProps {
}

const Header = (props: HeaderProps) => {
  const [isMount, setIsMount] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authSelector = useAppSelector(state => state.auth);

  const setLogout = async (e: any) => {
    e.preventDefault()
    console.log("t1: " + authSelector.token);
    dispatch(loading())
    try {
      await api.logout(authSelector.token)
      dispatch(logout())
      dispatch(clear())
      console.log("t2: " + authSelector.token);
      return navigate("/");
    } catch (err) {
      dispatch(logout())
      dispatch(error())
      setTimeout(() => {
        dispatch(clear())
        return navigate("/");
      }, 2000)
    }
  }

  useEffect(() => {
    if (isMount) {
      // 
    }
    return () => setIsMount(false)
  }, [])

  return (
    <header id="header" className="shadow-md">
      <nav className="p-6">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <h1 className="pr-6 text-2xl font-bold text-gray-500">BoolBnB</h1>
          </Link>
          <div className="flex justify-end flex-grow">
            <div className="md:flex space-x-6 hidden">
              {
                authSelector.token != null ?
                  <>
                    <Link to="/dashboard" className='text-gray-500 text-md'>Dashboard</Link>
                    <button onClick={(e) => setLogout(e)}>Esci</button>
                  </>
                  :
                  <>
                    <Link to="/" className="text-gray-500 text-md">Registrati</Link>
                    <Link to="/login" className="text-gray-500 text-md">Accedi</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;