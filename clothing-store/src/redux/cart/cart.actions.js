import { CartActionTypes } from "./cart.types";
//Payload is an optional property
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
}) 

export const addCartItem = item => ({
    type: CartActionTypes.ADD_CART_ITEM,
    payload: item
})

export const reduceCartItemQuantity = item => ({
    type: CartActionTypes.REDUCE_CART_QUANTITY,
    payload: item
})

export const removeCartItem = item => ({
    type: CartActionTypes.REMOVE_CART_ITEM,
    payload: item
})