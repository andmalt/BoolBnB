import React from 'react'
import useDarkSide, { classNames } from '../../services/functions';
import { Switch } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

interface SwitcherProps {
    className?: string
}

const Switcher = (props: SwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { theme, setTheme } = useDarkSide();
    const isDark = theme === "dark";

    const toggleDarkMode = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    return (
        <Switch
            checked={isDark}
            onChange={toggleDarkMode}
            className={classNames(
                className,
                isDark ? 'bg-ink-600' : 'bg-slate-300',
                'relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60'
            )}
        >
            <span className="sr-only">{t("header.changeTheme")}</span>
            {/* moon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-1.5 h-4 w-4 text-slate-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            {/* sun */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-1.5 h-4 w-4 text-slate-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <span
                aria-hidden="true"
                className={classNames(
                    isDark ? 'translate-x-6' : 'translate-x-0',
                    'pointer-events-none z-10 inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
    )
}

export default Switcher;
