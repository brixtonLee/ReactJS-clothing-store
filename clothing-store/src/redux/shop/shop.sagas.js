import {takeLatest, call, put} from 'redux-saga/effects';

import { ShopActionTypes } from './shop.types';

import { firestore, convertCollecitonsSnapShotToMaps } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
    try{
        const collectionRef = yield firestore.collection('collections');
        //Different from promise oriented
        const snapshot = yield collectionRef.get();
        /* The second and fellow param pass into call is the params to the first param function */
        const collectionsMap = yield call(convertCollecitonsSnapShotToMaps, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }
    catch (error){
        yield put(fetchCollectionsFailure(error.message));
    }

}

export function* fetchCollectionsStart(){
     yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
     )
}
