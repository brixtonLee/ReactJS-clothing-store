export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
};

export const reduceCartItemQuantity = (cartItems, cartItemToReduce) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToReduce.id);
    
    if(existingCartItem.quantity === 1){
        console.log('hi')
        return cartItems.filter(cartItem => cartItem.id !== cartItemToReduce.id);
    }
   
    return cartItems.map(cartItem => cartItem.id === cartItemToReduce.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
    
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if(existingCartItem){
        return cartItems.filter(cartItem => cartItem.id != existingCartItem.id);
    }
}