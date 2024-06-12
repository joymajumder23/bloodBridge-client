import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import "./CheckOutForm.css"

const CheckOut = () => {
    const stripe = useStripe();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const fundAmount = 10;
    console.log(clientSecret);

    useEffect(() => {
        if (fundAmount) {
            axiosSecure.post('/create-payment-intent', { fund: fundAmount })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, fundAmount]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            console.log('[error]', error);
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        //   confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });
        if (confirmError) {
            console.log('confirm error', confirmError);
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

            }

            // save the payment in the database
            const payment = {
                email: user?.email,
                fund: fundAmount,
                transactionId: paymentIntent.id,
                date: new Date().toLocaleDateString()
            }
            console.log(transactionId);


            const res = await axiosSecure.post('/fund', payment);
            console.log(res);
            if (res.data?.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thankyou for funding",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn bg-red-500 text-white rounded-none" type="submit" disabled={!stripe || !clientSecret}>
                10$ Fund
            </button>
            <p className="text-red-500">{error}</p>
            {
                transactionId && <p className="text-green-500">You're Transaction Id: {transactionId}</p>
            }
        </form>
    );
};

export default CheckOut;