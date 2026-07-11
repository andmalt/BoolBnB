import React, { useEffect, useRef, useState } from 'react'
// import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import '../../../css/loading.css'

interface LoadingProp {

}

const Loading = (props: LoadingProp) => {
    const { } = props;
    const { t } = useTranslation();
    const [isMount, setIsMount] = useState<boolean>(false);

    useEffect(() => {
        setIsMount(true)
        if (isMount) {
            //
        }
        return () => setIsMount(false)
    }, []);

    return (
        <div id='container' className='page'>
            <div id="text">
                <p id='paragraph' className='font-semibold text-brand-500'>{t("loading")}</p>
            </div>
            <div id="spinner">
                <div className="animate-spin inline-block w-16 h-16 border-[3px] border-current border-t-transparent text-brand-500 rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading;