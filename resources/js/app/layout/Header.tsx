import React from 'react';
import '../../../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/connection_manager';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clear, logout, loading, error } from '../store/authSlice';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../services/functions';


const Header = () => {
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

  return (
    <div id="header">
      <nav className="p-6">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <h1 className="pr-6 text-2xl font-bold text-[#6366f1]">BoolBnB</h1>
          </Link>
          <div className="flex justify-end flex-grow">
            <div className="flex space-x-6">
              {
                authSelector.token != null ?
                  <>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="font-bold inline-flex w-full justify-center rounded-md border border-[rgba(0,0,0,0)] bg-[#29303d] px-4 py-2 text-sm text-[#9ca3af] shadow-sm hover:border-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] focus:ring-offset-2 focus:ring-offset-[#9ca3af]">
                          Menu
                          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#29303d] shadow-lg ring-1 ring-[#29303d] ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={"/dashboard"}
                                  className={classNames(
                                    active ? 'bg-[#6366f1] text-white' : 'text-[#9ca3af]',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                            {/* <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-blue-800 text-white' : 'text-blue-800',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Support
                                </a>
                              )}
                            </Menu.Item> */}
                            <form method="POST" onSubmit={(e) => setLogout(e)}>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    type="submit"
                                    className={classNames(
                                      active ? 'bg-[#6366f1] text-white' : 'text-[#9ca3af]',
                                      'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                  >
                                    Esci
                                  </button>
                                )}
                              </Menu.Item>
                            </form>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
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