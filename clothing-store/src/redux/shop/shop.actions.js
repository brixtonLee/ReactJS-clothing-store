import { ShopActionTypes } from "./shop.types";
import { firestore, convertCollecitonsSnapShotToMaps } from "../../firebase/firebase.utils";

// export const updateCollections = (collectionsMap) => ({
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// })

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

//Redux thunk 
export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollecitonsSnapShotToMaps(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error)));
    }
}




/* 
    Redux Thunk 
    yarn add redux-thunk
    1. What redux thunk is? It is a function creator that return a function that access to dispatch
*/

/*
    Redux Saga
    yarn add redux-saga
    1. It is a function that conditionally run
    2. It will run when the actions that passed into has the item that it is listening to
    3. It can do any kind of logic
    4. Any kind of the asynchronous event / handling impure function is moved to the saga
    4. If the function is pure, whenever you call the function with same params, the result will always be the same
    5. If the function is impure, although you call the function with different params, the result might be different at some point  
*/

/*
    Generator Function
    1. it is declared as function* functionName
    2. Yield is like await keyword that put the execution in the background until the gen.next() is called again until done
    3. Yield: it is called line by line when the genName.next() is called
    3. Until the done is true, then the generator function is completed
*/