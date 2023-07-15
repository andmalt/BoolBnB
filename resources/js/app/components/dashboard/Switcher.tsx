import React, { useState } from 'react'
import useDarkSide, { classNames } from '../../services/functions';
import { Switch } from '@headlessui/react';

interface SwitcherProps {
    className?: string
}

const Switcher = (props: SwitcherProps) => {
    const { className } = props;
    const { colorTheme, changeTheme } = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "dark" ? false : true
    );

    const toggleDarkMode = (checked: any) => {
        let mode = checked ? "dark" : "light"
        changeTheme(mode);
        setDarkSide(checked);
    };

    return (
        <>
            <Switch checked={darkSide} onChange={toggleDarkMode} className={classNames(className, darkSide ? 'bg-[#6366f1]' : 'bg-slate-300', 'relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute z-[2] left-1 bottom-[6px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute z-[2] right-1 bottom-[6px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${darkSide ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white z-10 shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </>

    )
}

export default Switcher;