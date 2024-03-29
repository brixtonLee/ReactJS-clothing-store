import React from "react";
import './menu-item.styles.scss';

export const MenuItem = ({title, imageUrl}) => {

    return(
    <div className="menu-item">
        <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}/>

        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
)}
