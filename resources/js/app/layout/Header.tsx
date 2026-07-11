import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/connection_manager';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clear, logout, loading, error } from '../store/authSlice';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { classNames } from '../services/functions';
import { Switcher, LanguageSwitcher } from '../components';
import { useTranslation } from 'react-i18next';


const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authSelector = useAppSelector(state => state.auth);
  const page = document.getElementById("body-container");
  page?.scrollIntoView();


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
    <header className='sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-ink-900/80'>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className='flex items-center gap-8'>
          <Link to={'/'} className='flex items-center gap-2'>
            <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-600/30'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
              </svg>
            </span>
            <span className="text-xl font-bold tracking-tight text-heading">Bool<span className='text-brand-500'>BnB</span></span>
          </Link>
          <Link to={'/homes'} className='hidden text-sm font-medium text-slate-600 transition hover:text-brand-600 sm:block dark:text-slate-300 dark:hover:text-brand-400'>
            {t("header.explore")}
          </Link>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher />
          <Switcher />
          {
            authSelector.token != null ?
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="btn btn-ghost !px-3 !py-2">
                    <UserCircleIcon className='h-5 w-5' aria-hidden="true" />
                    <span className='hidden sm:block'>{t("header.account")}</span>
                    <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
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
                  <Menu.Items className="card absolute right-0 z-10 mt-2 w-56 origin-top-right overflow-hidden !rounded-xl p-1.5 shadow-lg focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={"/dashboard"}
                          className={classNames(
                            active ? 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white' : 'text-slate-700 dark:text-slate-200',
                            'block rounded-lg px-3 py-2 text-sm font-medium'
                          )}
                        >
                          {t("header.dashboard")}
                        </Link>
                      )}
                    </Menu.Item>
                    <form method="POST" onSubmit={(e) => setLogout(e)}>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active ? 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white' : 'text-slate-700 dark:text-slate-200',
                              'block w-full rounded-lg px-3 py-2 text-left text-sm font-medium'
                            )}
                          >
                            {t("header.logout")}
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </Menu.Items>
                </Transition>
              </Menu>
              :
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
                  {t("header.login")}
                </Link>
                <Link to="/register" className="btn btn-primary !px-4 !py-2">
                  {t("header.register")}
                </Link>
              </>
          }
        </div>
      </nav>
    </header>
  )
}

export default Header;
