import {takeLatest, call, put} from 'redux-saga/effects';

import { ShopActionTypes } from './shop.types';

import { firestore, convertCollecitonsSnapShotToMaps } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

/*
    1. Take every will not pause the execution of JavaScript to wait anything in the second function parameter to come back
    2. put is same as dispatch the function
    3. you must put yield keyword and it is easier for debugging
*/

/**
    1.  
 */

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

/*
    Take:
    1. We don't need to pass the function into as the second argument
    2. Instead of, it is waiting for the action to happen first
    3. It will return the promise / action payload that is going to be resolved
    4. The rest of the code would not execute until the action is operated
    5. It will only fire once the rest of code, its concept is same like the basic javascript generator function which we could not go back to the top to re run the code
    6. You can use the while loop to loop through the take so that the rest of the code can be fired again and again.

    Take Every:
    1. We need to pass the fucntion into as the second argument
    2. It will fire the action everytime the action is operated (It is created the new generator / spawning new saga and called it again and again)

    take latest:
    1. It will cancel all the previous one using yield and only execute the latest one

    using delay, you can block the code from executing

*/