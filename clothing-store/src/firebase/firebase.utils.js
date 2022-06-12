/*
  Using firebase in react js
  1. create the firebase project in firebase console
  2. create the web app for it
  3. copy the config
  4. in the terminal, yarn add firebase
  5. create the firebase folder in the src directory
  6. inside this folder, create firebase.utils.js
*/



//In firebaseversion 9, it is imported firebase/compat/app, not firebase/app
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

//config get from the firebase
const config = {
    apiKey: "AIzaSyDkFSuvjBjg4DEc7EXYDLZYAZLGhkrXIvU",
    authDomain: "react-js-db-90205.firebaseapp.com",
    projectId: "react-js-db-90205",
    storageBucket: "react-js-db-90205.appspot.com",
    messagingSenderId: "830593941102",
    appId: "1:830593941102:web:07663230576158d554307f",
    measurementId: "G-9NLCQP5YTW"
  };

  firebase.initializeApp(config);

  //Firebase Authentication library
  export const auth = firebase.auth();
  //Firebase firestore library
  export const firestore = firebase.firestore();

  //Authentication provider
  const provider = new firebase.auth.GoogleAuthProvider();
  //Custom parameter for provider
  //This line will trigger the google account sign in
  provider.setCustomParameters({prompt: 'select_account'});

  //The sign in with popup method will trigger only google account sign in
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    //Since it is an api request, hence we use await
    const snapshot = await userRef.get();
  
    if(!snapshot.exists){
      const { displayName, email } = userAuth;
  
      const createdAt = new Date();
  
      // To create user at the firestore using set and it is an api request, hence we add await infront
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch (error){
          console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  export default firebase;