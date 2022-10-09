import React from 'react';
import '../../../css/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header" className="shadow-md">
      <nav className="p-6">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <h1 className="pr-6 text-2xl font-bold text-gray-500">BoolBnB</h1>
          </Link>
          <div className="flex justify-end flex-grow">
            <div className="md:flex space-x-6 hidden">
              <Link to="/about" className='text-gray-500 text-md'>Chi siamo</Link>
              <Link to="/dashboard" className='text-gray-500 text-md'>Dashboard</Link>
              <Link to="/" className="text-gray-500 text-md">Registrati</Link>
              <Link to="/login" className="text-gray-500 text-md">Accedi</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;