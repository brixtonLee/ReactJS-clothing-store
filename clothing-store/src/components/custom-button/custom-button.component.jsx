import React from "react";

import './custom-button.styles.scss'

export const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => {
    //The children here is referring to what is the text of the button

    return(
    <button className={`${inverted ? 'inverted ': ''} ${isGoogleSignIn ? 'google-sign-in ': ''}custom-button`} {...otherProps}>
        {children}
    </button>
)};