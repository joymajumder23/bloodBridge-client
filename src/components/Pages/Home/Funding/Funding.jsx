import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { Helmet } from "react-helmet-async";

const Funding = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
    console.log(stripePromise);
    return (
        <div className="max-w-screen-xl mx-auto mt-12 text-center">
            <Helmet>
                <title>Funding | Donate</title>
            </Helmet>
            <h1 className="text-4xl font-bold">Funding</h1>
            <p>Please some donate for charity</p>
            <div className="text-center">
            <Elements stripe={stripePromise}>
                <CheckOut/>
            </Elements>
            </div>
        </div>
    );
};

export default Funding;