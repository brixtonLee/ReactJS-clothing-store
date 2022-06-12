import  { createSelector } from 'reselect';

/* 
    Selector
    1. There is two types of selector which are input and output selector
*/

// Select only small portion of the whole state
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItems) => accumulatedQuantity + cartItems.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedPrice, cartItems) => accumulatedPrice + (cartItems.price * cartItems.quantity), 0)
)
  