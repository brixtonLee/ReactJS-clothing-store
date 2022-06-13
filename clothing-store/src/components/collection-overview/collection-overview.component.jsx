import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import React from "react";

import { CollectionPreview } from "../collection-preview/collection-preview.component";
import { selectCollection } from "../../redux/shop/shop.selector";

import './collection-overview.styles.scss';

const CollectionOverview = ({collections}) => (
    <div className="collections-overview">
        {
                //First option
                // collections.map(collection => (<CollectionPreview items={collection.items} title={collection.title}/>))

                //Second option
                collections.map(({id, ...otherCollectionProps}) => (<CollectionPreview key={id} {...otherCollectionProps}/>))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollection
})
export default connect(mapStateToProps)(CollectionOverview);
