import React from "react";
import { addCartItem, removeCartItem, reduceCartItemQuantity } from "../../redux/cart/cart.actions";

import './checkOut-item.styles.scss';

//Redux
import { connect } from "react-redux";


const CheckOutItem = ({cartItem, removeCartItem, addCartItem, reduceItemQuantity}) => {
    const {name, quantity, price, imageUrl} = cartItem;

    return(
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt="item" />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={() => reduceItemQuantity(cartItem)}>&#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => addCartItem(cartItem)}>&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={() => removeCartItem(cartItem)}>&#10005;</div>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    removeCartItem: item => dispatch(removeCartItem(item)),
    addCartItem: item => dispatch(addCartItem(item)),
    reduceItemQuantity: item => dispatch(reduceCartItemQuantity(item))
})
export default connect(null, mapDispatchToProps)(CheckOutItem)