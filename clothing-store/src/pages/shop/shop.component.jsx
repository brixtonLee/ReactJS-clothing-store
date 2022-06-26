import React from "react";

import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";

import { selectCollections } from "../../redux/shop/shop.selector";




//firebase
import {firestore, convertCollecitonsSnapShotToMaps} from "../../firebase/firebase.utils";
import CollectionOverviewComponent from "../../components/collection-overview/collection-overview.component";

import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

// import { fetchCollectionStartAsync } from "../../redux/shop/shop.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectISCollectionsFetching } from "../../redux/shop/shop.selector";
import {createStructuredSelector} from 'reselect';
import { useEffect } from "react";

const ShopPage = ({fetchCollectionsStart}) => {

    // unsubscribeFromSnapShot = null;

    //If we are querying from the firebase, meaning that we are subscribing to their service, hence we must remember to close it

    // componentDidMount(){
    //     const {updateCollections} = this.props;
    //     const collectionRef = firestore.collection('collections');
    //     this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
    //         const collectionsMap = convertCollecitonsSnapShotToMaps(snapshot);
    //         console.log(collectionsMap);
    //         updateCollections(collectionsMap);

    // Promise Pattern
    //     const collectionRef = firestore.collection('collections');
    //     collectionRef.get().then(snapshot => {
    //         const collectionsMap = convertCollecitonsSnapShotToMaps(snapshot);
    //         console.log(collectionsMap);
    //         updateCollections(collectionsMap);
    //     });
    // }
    useEffect(() => {fetchCollectionsStart()}, [fetchCollectionsStart])
    //Redux Thunk
    // componentDidMount(){
    //     const {fetchCollectionsStart} = this.props
    //     fetchCollectionsStart();
    // }

    // render(){
        return(
            <div className="shop-page">
                <CollectionOverviewComponent/>
            </div>
        )
    // }
};
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         collections:SHOP_DATA
    //     }
    // }

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectISCollectionsFetching
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);