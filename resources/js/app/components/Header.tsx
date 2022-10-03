import React from 'react';
import '../../../css/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header">
      <nav className="p-6">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <h1 className="pr-6 border-r-2 text-2xl font-bold text-gray-500">saunatime</h1>
          </Link>
          <div className="flex justify-between flex-grow">
            <div className="flex ml-6 items-center">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4 cursor-pointer text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input className="outline-none text-sm flex-grow bg-gray-100" type="text" placeholder="Cerca…" />
            </div>
            <div className="md:flex space-x-6 hidden">
              <Link to="about" className='text-gray-500 text-md'>About</Link>
              <span className="text-gray-500 text-md">Sign up</span>
              <span className="text-gray-500 text-md">Log in</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;