import React, { useEffect, useState } from 'react';
import '../../../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/connection_manager';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clear, logout, loading, error } from '../store/authSlice';

interface HeaderProps {
}

const Header = (props: HeaderProps) => {
  const { } = props;
  const [isMount, setIsMount] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authSelector = useAppSelector(state => state.auth);

  const setLogout = async (e: any) => {
    e.preventDefault()
    dispatch(loading())
    try {
      await api.logout(authSelector.token)
      dispatch(logout())
      dispatch(clear())
      return navigate("/");
    } catch (err) {
      console.log("header error:", err);
      // need fixed the catch
      dispatch(logout())
      dispatch(error())
    }
  }

  useEffect(() => {
    if (isMount) {
      // 
    }
    return () => setIsMount(false)
  }, [])

  return (
    <div id="header">
      <nav className="p-6">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <h1 className="pr-6 text-2xl font-bold text-blue-800">BoolBnB</h1>
          </Link>
          <div className="flex justify-end flex-grow">
            <div className="flex space-x-6">
              {
                authSelector.token != null ?
                  <>
                    <Link to="/dashboard" className='text-blue-800 hover:text-blue-600 
                      transition ease-in-out delay-150 hover:-translate-y-1 font-bold'>
                      Dashboard
                    </Link>
                    <button
                      className='text-blue-800 hover:text-blue-600 
                      transition ease-in-out delay-150 hover:-translate-y-1 font-bold'
                      onClick={(e) => setLogout(e)}>
                      Esci
                    </button>
                  </>
                  :
                  <>
                    <Link to="/register" className="text-blue-800 hover:text-blue-600 
                      transition ease-in-out delay-150 hover:-translate-y-1 font-bold">
                      Registrati
                    </Link>
                    <Link to="/login" className="text-blue-800 hover:text-blue-600 
                      transition ease-in-out delay-150 hover:-translate-y-1 font-bold">
                      Accedi
                    </Link>
                  </>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header;