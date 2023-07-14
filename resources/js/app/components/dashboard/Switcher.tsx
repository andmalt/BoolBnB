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
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${darkSide ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </>

    )
}

export default Switcher;