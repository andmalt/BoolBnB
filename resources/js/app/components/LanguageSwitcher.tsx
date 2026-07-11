import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { classNames } from '../services/functions'

const LANGUAGE_OPTIONS = [
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "en", label: "English", flag: "🇬🇧" },
]

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const current = i18n.language.startsWith("en") ? "en" : "it";

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                aria-label={t("header.changeLanguage")}
                className="flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2.5 text-sm font-semibold uppercase text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                {current}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="card absolute right-0 z-10 mt-2 w-44 origin-top-right overflow-hidden !rounded-xl p-1.5 shadow-lg focus:outline-none">
                    {
                        LANGUAGE_OPTIONS.map(option => (
                            <Menu.Item key={option.code}>
                                {({ active }) => (
                                    <button
                                        type='button'
                                        onClick={() => i18n.changeLanguage(option.code)}
                                        className={classNames(
                                            active ? 'bg-slate-100 dark:bg-white/10' : '',
                                            current === option.code ? 'text-brand-600 dark:text-brand-400' : 'text-slate-700 dark:text-slate-200',
                                            'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium'
                                        )}
                                    >
                                        <span aria-hidden="true">{option.flag}</span>
                                        {option.label}
                                        {
                                            current === option.code ?
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-auto h-4 w-4">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                </svg>
                                                :
                                                null
                                        }
                                    </button>
                                )}
                            </Menu.Item>
                        ))
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default LanguageSwitcher;
