import React from "react"; 

import { CollectionItem } from "../collection-item/collection-item.component";

import './collection-preview.styles.scss';

export const CollectionPreview = ({title, items}) => (
    <div className="collection-preview">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {/* In filter, the first is referring to each item, the second param is referring to the index, the third one is referring to the whole array */}
            {/* In react, we can destructure the item into separate parameters as in ES6 Javascript */}
            {items.filter((item, index ) => index < 4).map(({id, ...otherItemProps}) => (
                // If we did  not destructure, this line below will look like <CollectionItem key = {item.id}, name = {item.name} ...etc)
                <CollectionItem key={id} {...otherItemProps} />
            ))}
        </div>
    </div>
)