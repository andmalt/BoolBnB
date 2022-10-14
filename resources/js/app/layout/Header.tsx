import React, { useEffect, useState } from 'react';
import '../../../css/header.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Header = () => {

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  const controlAuth = () => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    controlAuth();
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
                !isAuth ?
                  <>
                    <Link to="/" className="text-gray-500 text-md">Registrati</Link>
                    <Link to="/login" className="text-gray-500 text-md">Accedi</Link>
                  </>
                  :
                  <Link to="/dashboard" className='text-gray-500 text-md'>Dashboard</Link>
              }

            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;