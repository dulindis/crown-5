import React from 'react';
import StripeChckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton = ({price})=> {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51IsAqJCdsyvt9GYO8oDGNNRM85TvGsVN5Ywc8FacohDhdT3z6wraNeN2TGtOC41bgvmtOe0NqX6HSRBFH18PFAcR00pRppgwl6';
    const onToken = token => {

        //axios will ake any url we are att and add payment to it
        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceForStripe,
                token
            }
        }).then(response=>{
            alert('Payment successful')
        }).catch(error=>  {  
              console.log('Payment error:',JSON.parse(error));
        alert('There was an issue with your payment, Please try again and make sure you use the provided credit card details.')}
            )
    }
    return (
        <StripeChckout 
            label='Pay Now'
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