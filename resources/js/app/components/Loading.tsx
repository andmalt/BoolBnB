import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import '../../../css/loading.css'

interface LoadingProp {

}

const Loading = (props: LoadingProp) => {
    const { } = props;
    const [isMount, setIsMount] = useState<boolean>(false);

    useEffect(() => {
        setIsMount(true)
        if (isMount) {
            //
        }
        return () => setIsMount(false)
    }, []);

    return (
        <div id='container'>
            <div id="text">
                <p id='paragraph'>caricamento.....</p>
            </div>
            <div id="spinner">
                <div className="animate-spin inline-block w-16 h-16 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading;