import React from "react";

import { selectCollection } from "../../redux/shop/shop.selector";

import { useParams } from "react-router-dom";

import './collection.styles.scss';

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useSelector } from "react-redux";


const Collection = ({collections}) => {
    return(
        <div className="category">
            <h2>Category page</h2>
        </div>
    )
}

const mapStateToProps =createStructuredSelector({
    collection: selectCollection
})

export default connect(mapStateToProps)(Collection);