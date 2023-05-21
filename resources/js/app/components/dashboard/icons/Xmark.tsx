import React from 'react'
import { classNames } from '../../../services/functions';

interface XmarkProps {
    className?: string;
    fill?: string;
    stroke?: string;
    onClick?(): React.MouseEventHandler<SVGSVGElement> | React.DOMAttributes<SVGSVGElement> | void
}

const Xmark = (props: XmarkProps) => {
    const { fill, className, stroke, onClick } = props;
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" fill={classNames("none", fill)} viewBox="0 0 24 24" strokeWidth={1.5} stroke={classNames("currentColor", stroke)} className={classNames("w-8 h-8", className)} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

export default Xmark