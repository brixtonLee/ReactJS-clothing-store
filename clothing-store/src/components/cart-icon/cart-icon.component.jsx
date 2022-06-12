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
/*
    Reduce In JavaScript
    1. It will return one value only
    2. The first param is the function, the second param is the starting value
    3. The function has two quantity which is total and the other attributes
    4. If only return total, it will only return the first value of the array
*/

/* 
    1. Whenever the reducer action is called and update the state (return the whole new object)
    2. The mapStateToProps function is called every single time
    3. Hence it will re-render the component
*/

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