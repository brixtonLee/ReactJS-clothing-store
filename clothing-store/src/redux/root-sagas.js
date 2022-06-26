import {all, call} from 'redux-saga/effects';

import { cartSagas } from './cart/cart.sagas';
import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart), call(userSagas), call(cartSagas)
    ])
}

/*
    1. all takes an array of sagas
    2. It will run all the sagas concurrently / on separate task stream
*/