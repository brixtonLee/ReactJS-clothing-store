import React from "react";
import SHOP_DATA from "./shop.data";

import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";
class ShopPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            collections:SHOP_DATA
        }
    }

    render(){
        const {collections} = this.state;
        return <div className="shop-page">
            {
                //First option
                // collections.map(collection => (<CollectionPreview items={collection.items} title={collection.title}/>))

                //Second option
                collections.map(({id, ...otherCollectionProps}) => (<CollectionPreview key={id} {...otherCollectionProps}/>))
            }
        </div>
    }
}
export default ShopPage;