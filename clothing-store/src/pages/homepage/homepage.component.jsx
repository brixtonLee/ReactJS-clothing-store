import React from "react";
import { useParams } from "react-router-dom";
import Directory from "../../components/directory/directory.component";

import './homepage.styles.scss'
export const Homepage = props => {

    return (
    
    <div className="homepage">
        <Directory/>
    </div>
)}