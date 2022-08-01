//This is the must to create the component
import React from "react";
import './cart-dropdown.styles.scss';
import { useParams } from "react-router-dom";
import { CustomButton } from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { Link } from "react-router-dom";

//Redux
import { connect, useSelector } from "react-redux";

//Selector
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from "../../redux/cart/cart.selector";
import { selectCollection } from "../../redux/shop/shop.selector";

// Normal React Redux
// const CartDropDown = ({cartItems}) => (

//React Hooks Solution
const CartDropDown = () => {
    const cartItems = useSelector(selectCartItems);

    //useParams
    const params = useParams();
    //with desturcturing
    const {collectionId} = useParams();

    // //To pass the params into the selector
    // const collection = useSelector(selectCollection(collectionId))
    return(

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
}
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

//Normal React Redux
// export default connect(mapStateToProps, null)(CartDropDown)

//React Hooks Solution
export default CartDropDown;