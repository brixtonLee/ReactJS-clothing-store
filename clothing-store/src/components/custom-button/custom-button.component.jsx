import React from "react";

import './custom-button.styles.scss'

export const CustomButton = ({children, isGoogleSignIn, ...otherProps}) => {
    //The children here is referring to what is the text of the button

    return(
    <button className={`${isGoogleSignIn ? 'google-sign-in ': ''}custom-button`} {...otherProps}>
        {children}
    </button>
)};