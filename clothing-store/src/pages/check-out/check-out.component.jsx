import React from "react";

import './check-out.styles.scss';

import CheckOutItem from "../../components/checkOut-item/checkOut-item.component";

//Redux
import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect';
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selector";

//Stripe
import StripeCheckOutButton from "../../components/stripe-button/stripe-button.component";
const CheckOutPage = ({cartItems, total}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>

        </div>
        {
            cartItems.map(cartItem => <CheckOutItem key={cartItem.id} cartItem={cartItem}/>)
        }
        <div className="total"><span>Total : RM{total}</span></div>
        <StripeCheckOutButton price={total}/>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})
export default connect(mapStateToProps, null)(CheckOutPage)