import React, { useEffect, useState } from 'react'
import dropin, { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in'
import { classNames } from '../services/functions';
import api from '../services/connection_manager';
import { useAppSelector } from '../store/hooks';

interface BraintreeProps {
    clientToken: string;
    show: boolean;
    className?: string;
    id: number;
    getMyHouse(): void;
}

const Braintree = (props: BraintreeProps) => {
    const { clientToken, show, className, id, getMyHouse } = props;
    const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const authSelector = useAppSelector(state => state.auth);
    const dashSelector = useAppSelector(state => state.dashboard);

    useEffect(() => {
        if (show) {
            const config = {
                authorization: clientToken,
                container: "#braintree-drop-in-container",
                locale: "it_IT"
            }

            /**
             * initialize Braintree method callback
             * 
             * @param error 
             * @param instance 
             */
            const callback = (error: object | null, instance: Dropin | undefined) => {
                if (error) console.error(error);
                else setBraintreeInstance(instance);
            }

            const initializeBraintree = () => dropin.create(config, callback);

            if (braintreeInstance) {
                braintreeInstance.teardown().then(() => {
                    initializeBraintree();
                })
            } else {
                initializeBraintree();
            }
        }
    }, [show])

    const requestPaymentMethod = () => {
        setIsLoading(true)
        const callback = async (error: object | null, payload: PaymentMethodPayload) => {
            if (error) {
                console.error(error);
            } else {
                const data = {
                    token: payload.nonce,
                    sponsorship: id,
                }
                const response = await api.makePayment(authSelector.token, data)
                if (response.data.success) {
                    const data = {
                        sponsorship: [id],
                    }
                    try {
                        await api.updateSponsorshipToTheHouse(authSelector.token, dashSelector.id, data)
                        setIsPaid(true)
                        getMyHouse()
                    } catch (e) {
                        console.log("error updateSponsorshipToTheHouse", e);
                    }
                }
                // console.log("response", response.data)
            }
        }
        braintreeInstance && braintreeInstance.requestPaymentMethod(callback);
        setIsLoading(false)
    }


    return (
        <div className={classNames(show ? 'block' : 'hidden', className)}>
            {
                !isPaid ?
                    <div>
                        <div id='braintree-drop-in-container' className='mb-3' />
                        {
                            braintreeInstance && (
                                <div className='w-full flex justify-center items-center'>
                                    <button className='bg-white hover:bg-slate-200 p-3 mb-4 rounded-lg' disabled={!braintreeInstance} onClick={requestPaymentMethod}>
                                        {isLoading ? 'Pagamento in corso' : 'Paga Adesso'}
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default Braintree