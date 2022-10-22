import React, { useEffect, useState } from 'react';
import '../../../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/connection_manager';
import { useAppDispatch } from '../util/hooks';
import { clear, logout, loading, error } from '../util/authSlice';

export interface HeaderProps {
}

const Header = (props: HeaderProps) => {

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setLogout = async (e: any) => {
    e.preventDefault()
    dispatch(loading())
    await api.logout(token)
    try {
      localStorage.removeItem("token")
      setToken(null)
      dispatch(logout())
      dispatch(clear())
      setIsAuth(false)
      return navigate("/");
    } catch (err) {
      dispatch(error())
      return { err, message: "Error logout" }
    }
  }

  useEffect(() => {
    setIsMount(true)
    if (isMount) {
      if (token !== null) {
        setIsAuth(true)
      }
    }
    console.log("token: " + token);
    console.log("store token: ");
    console.log("store email: ");

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
                token !== null ?
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