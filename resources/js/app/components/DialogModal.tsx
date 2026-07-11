import React from 'react';
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
    /**
     * 
     */
    errors?: []
    /**
     * 
     */
    openModal: boolean
    /**
     * function for closing the modal
     */
    setOpenModal(): void
    /**
     * form type ["guest","admin"]
     */
    type: string
}

const DialogModal = (props: ModalProps) => {
    const { errors, setOpenModal, openModal, type } = props;
    return (
        <Transition appear show={openModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-ink-950/50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="card w-full max-w-md transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="flex items-center gap-2 text-lg font-semibold leading-6 text-heading"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    {type === "guest" ? "Errore Inserimento dati" : "Errori"}
                                </Dialog.Title>
                                <div className="mt-3">
                                    {
                                        errors?.map((error, i) => {
                                            return (
                                                <p key={`err${i}`} className="text-sm text-muted">
                                                    {error}
                                                </p>
                                            )
                                        })
                                    }
                                </div>

                                <div className="mt-6 flex flex-row justify-end">
                                    <button
                                        className="btn btn-primary"
                                        onClick={setOpenModal}
                                    >
                                        Va bene!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default DialogModal;