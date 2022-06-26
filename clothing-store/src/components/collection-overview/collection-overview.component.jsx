import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import React from "react";

import { CollectionPreview } from "../collection-preview/collection-preview.component";
import { selectCollections } from "../../redux/shop/shop.selector";

import {ErrorBoundary} from 'react-error-boundary'

import './collection-overview.styles.scss';

const CollectionOverview = ({collections}) => {
    collections = Object.values(collections);
    return(
        <div className="collections-overview">
            {
                
                //First option
                // collections.map(collection => (<CollectionPreview items={collection.items} title={collection.title}/>))

                //Second option
                // Error due to it is an object
                collections.map(({id, ...otherCollectionProps}) => (<ErrorBoundary><CollectionPreview key={id} {...otherCollectionProps}/></ErrorBoundary>))
                // values.map(({id, ...otherCollectionProps}) => {<CollectionPreview key={id} {...otherCollectionProps}/>})
                // collections.map(({id, ...otherCollectionProps}) => (<ErrorBoundary><CollectionPreview key={id} {...otherCollectionProps}/></ErrorBoundary>))
            }
        </div>

    )
    
}



const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps)(CollectionOverview);



