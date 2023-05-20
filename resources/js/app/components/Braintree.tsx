import React, { useEffect, useState } from 'react'
import dropin, { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in'
import { classNames } from '../services/functions';

interface BraintreeProps {
    clientToken: string;
    show: boolean;
    checkout: (nonce: string) => void;
    className?: string;
}

const Braintree = (props: BraintreeProps) => {
    const { clientToken, show, checkout, className } = props;
    const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>();

    useEffect(() => {
        if (show) {
            const config = {
                authorization: clientToken,
                container: "#braintree-drop-in-container"
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
        const callback = (error: object | null, payload: PaymentMethodPayload) => {
            if (error) {
                console.error(error);
            } else {
                const paymentMethodNonce = payload.nonce;
                console.log("payment method nonce", payload.nonce);
                checkout(paymentMethodNonce);
            }
        }
        braintreeInstance && braintreeInstance.requestPaymentMethod(callback);
    }


    return (
        <div className={classNames(show ? 'block' : 'hidden', className)}>
            <div id='braintree-drop-in-container'>
                {
                    braintreeInstance && (
                        <button disabled={!braintreeInstance} onClick={requestPaymentMethod}>
                            Paga Adesso
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Braintree