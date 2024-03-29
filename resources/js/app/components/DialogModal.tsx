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
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {type === "guest" ? "Errore Inserimento dati" : "Errori"}
                                </Dialog.Title>
                                <div className="mt-2">
                                    {
                                        errors?.map((error, i) => {
                                            return (
                                                <p key={`err${i}`} className="text-sm text-gray-500">
                                                    {error}
                                                </p>
                                            )
                                        })
                                    }
                                </div>

                                <div className="mt-4 flex flex-row justify-center">
                                    <button
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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