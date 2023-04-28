import React from 'react'
import { useAppSelector } from '../../store/hooks';

interface TopBarMessagesProps {
    update(): void
    trashedMessages(): void
}

const TopBarMessages = (props: TopBarMessagesProps) => {
    const { update, trashedMessages } = props;
    const messagesSelector = useAppSelector(state => state.messages)
    return (
        <div className='mt-4 mx-4'>
            <div className='bg-white h-12 rounded-md flex flex-wrap justify-between'>
                <div className='flex items-center w-1/2'>
                    <button className='mx-4' onClick={update}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                    {
                        !messagesSelector.isTrashedMessages ?
                            <button className='mx-4' onClick={trashedMessages}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </button>
                            :
                            null
                    }

                </div>
                {
                    !messagesSelector.isTrashedMessages ?
                        <div className='flex justify-center items-center w-1/2'>
                            <h2 className='uppercase font-semibold'>Messaggi ricevuti</h2>
                        </div>
                        :
                        <div className='flex justify-center items-center w-1/2'>
                            <h2 className='uppercase font-semibold'>Messaggi nel cestino</h2>
                        </div>
                }

            </div>
        </div>
    )
}

export default TopBarMessages;