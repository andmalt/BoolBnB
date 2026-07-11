import React from 'react'
import "../../../../css/dashboard.css"
import { classNames } from '../../services/functions';

interface SponsorshipCardProps {
    name: string;
    price: number;
    duration: number;
    generateToken(): Promise<void>
}

const tierStyle = (name: string) => {
    switch (name) {
        case 'gold':
            return { badge: 'bg-amber-400/15 text-amber-600 dark:text-amber-400', ring: 'border-amber-400/40' };
        case 'silver':
            return { badge: 'bg-slate-400/15 text-slate-600 dark:text-slate-300', ring: 'border-slate-400/40' };
        default:
            return { badge: 'bg-brand-500/10 text-brand-600 dark:text-brand-400', ring: 'border-brand-400/40' };
    }
}

const SponsorshipCard = (props: SponsorshipCardProps) => {
    const { name, price, duration, generateToken } = props;
    const style = tierStyle(name);

    return (
        <div className={classNames(style.ring, 'card flex w-[90%] flex-col p-6 transition hover:-translate-y-1 hover:shadow-lg sm:w-[65%] md:w-[40%] lg:w-[30%]')}>
            <span className={classNames(style.badge, 'mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                </svg>
                {name}
            </span>
            <p className="text-3xl font-bold text-heading">
                {price}&euro;
            </p>
            <p className="mb-6 mt-1 text-sm text-muted">
                sponsorizzazione per <span className='font-semibold text-heading'>{duration} ore</span>
            </p>
            <button className='btn btn-primary mt-auto w-full' onClick={generateToken}>
                Paga
                <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}

export default SponsorshipCard
