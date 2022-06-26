import React from "react";

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

//Redux
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

//Selector
import { selectCartItemsCount } from "../../redux/cart/cart.selector";

const CartIcon = ({toggleCartHidden, itemCount}) => (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className="item-count">{itemCount}</span>
        </div>
);
//Before Selector
// const mapStateToProps = ({cart: {cartItems}}) => ({
//     itemCount: cartItems.reduce((accumulatedQuantity, cartItems) => accumulatedQuantity + cartItems.quantity, 0)
// })

//After Selector
//State at here is to pass in the whole state (including the state from all the reducers)
const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon)