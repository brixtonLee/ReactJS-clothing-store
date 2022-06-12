import React from "react";

import { CustomButton } from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { Link } from "react-router-dom";

import './cart-dropdown.styles.scss';

//Redux
import { connect } from "react-redux";

//Selector
import { selectCartItems } from "../../redux/cart/cart.selector";
import {createStructuredSelector} from 'reselect';
const CartDropDown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? 
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}></CartItem>)
                : <span className="empty-message">Your Cart is Empty</span>
            }
        </div>
        <Link to="/checkOut"><CustomButton>Go To Check out</CustomButton></Link>
        
    </div>
)
// The first cart is referring to the name of the reducer in the root reducer, the second is the property inside the cart reducer (Advance Destructuring)
//Before selector
// const mapStateToProps = ({cart: {cartItems}}) => ({
//     cartItems
// })

//After Selector
// const mapStateToProps = (state) => ({
//     cartItems: selectCartItems(state)
// })

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

/*
    1. For any state changed in any reducers, it will fire all the mapStateToProps actions and re-render the component due to the assignment of the new object
    2. Therefore, by using selector, we can prevent the mapStateToProps from being fired while any state that is unrelated changed in other reducers and improve the performance.
*/
export default connect(mapStateToProps, null)(CartDropDown)