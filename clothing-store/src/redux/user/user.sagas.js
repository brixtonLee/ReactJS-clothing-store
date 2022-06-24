import {takeLatest, put, all, call, take} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import { signInSuccess, signInFailure, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions';

export function* getSnapShotFromUserAuth(user, additionalData) {

    const userRef = yield call(createUserProfileDocument, user, additionalData);

    const userSnapshot = yield userRef.get();

    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
}

export function* signInWithGoogle() {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);

    }
    catch(error){
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload:{email, password}}) {
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    }
    catch(error){
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth){
            return;
        }
        yield getSnapShotFromUserAuth(userAuth);
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }
    catch(error){
        yield put(signOutFailure(error))
    }
}

export function* signOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signUp({payload: {email, password, displayName}}){
    try{
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    }
    catch(error){
        yield put(signUpFailure(error))
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapShotFromUserAuth(user, additionalData)
}

//to sign the user in after sign up
export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart),call(onEmailSignInStart), call(onCheckUserSession), call(signOutStart), call(onSignUpStart), call(onSignUpSuccess)]);
}



