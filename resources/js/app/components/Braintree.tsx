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
}

const Braintree = (props: BraintreeProps) => {
    const { clientToken, show, className, id } = props;
    const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>();
    const authSelector = useAppSelector(state => state.auth);

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
        const callback = async (error: object | null, payload: PaymentMethodPayload) => {
            if (error) {
                console.error(error);
            } else {
                // const paymentMethodNonce = payload.nonce;
                console.log("payment method nonce", payload.nonce);
                const data = {
                    token: payload.nonce,
                    sponsorship: id,
                }
                const response = await api.makePayment(authSelector.token, data)
                console.log("response", response.data)
            }
        }
        braintreeInstance && braintreeInstance.requestPaymentMethod(callback);
    }


    return (
        <div className={classNames(show ? 'block' : 'hidden', className)}>
            <div id='braintree-drop-in-container' className='mb-3' />
            {
                braintreeInstance && (
                    <button className='bg-white hover:bg-slate-200 p-3 mb-4 rounded-lg' disabled={!braintreeInstance} onClick={requestPaymentMethod}>
                        Paga Adesso
                    </button>
                )
            }
        </div>
    )
}

export default Braintree