import React from "react";

//Stripe
import StripeCheckout from "react-stripe-checkout";

const StripeCheckOutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51KwdJYHTkwmWJUsI0Xdd5yv6tlmthR4oLAcE3YHmalaRQPxj5GcEsQYJrkCNdImJZwUFMelMY62jgsbZuvsAyhws00JjClygpm";

    //Payment Success
    const onToken = token => {
        alert('Payment Successful');
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total is RM${price}`}
            amount={priceForStripe}
            panelLabel = '123 Now'
            currency="MYR"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}
export default StripeCheckOutButton;