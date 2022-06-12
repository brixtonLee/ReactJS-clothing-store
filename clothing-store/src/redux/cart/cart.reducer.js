import { removeCartItem } from "./cart.actions";
import { CartActionTypes } from "./cart.types";

//Utils
import { addItemToCart, removeItemFromCart,reduceCartItemQuantity } from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_CART_ITEM:
            return {
                ...state,
                // cartItems: [...state.cartItems, action.payload]
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.REDUCE_CART_QUANTITY:
            return {
                ...state,
                cartItems: reduceCartItemQuantity(state.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems,action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;