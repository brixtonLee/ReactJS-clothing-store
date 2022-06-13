import React from "react";


import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";

import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect';

import { selectCollection } from "../../redux/shop/shop.selector";

import CollectionOverviewComponent from "../../components/collection-overview/collection-overview.component";
const ShopPage = ({collections}) => (
    <div className="shop-page">
        <CollectionOverviewComponent/>
    </div>

);
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         collections:SHOP_DATA
    //     }
    // }

const mapStateToProps = createStructuredSelector({
    collections: selectCollection
})
export default connect(mapStateToProps)(ShopPage);