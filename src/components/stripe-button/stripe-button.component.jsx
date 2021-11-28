import React from 'react';
import StripeChckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price})=> {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51IsAqJCdsyvt9GYO8oDGNNRM85TvGsVN5Ywc8FacohDhdT3z6wraNeN2TGtOC41bgvmtOe0NqX6HSRBFH18PFAcR00pRppgwl6';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return (
        <StripeChckout 
            laubel='Pay Now'
            name='CRWN Clothing Ltf'
            billingAddress
            shippingAddressimage='https://svgshae.com/i/CUz.svg'
            description={`Your total is: $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton