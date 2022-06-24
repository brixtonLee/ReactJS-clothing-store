/*
  Using firebase in react js
  1. create the firebase project in firebase console
  2. create the web app for it
  3. copy the config
  4. in the terminal, yarn add firebase
  5. create the firebase folder in the src directory
  6. inside this folder, create firebase.utils.js
*/



//In firebase version 9, it is imported firebase/compat/app, not firebase/app
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
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  //Custom parameter for provider
  //This line will trigger the google account sign in
  googleProvider.setCustomParameters({prompt: 'select_account'});

  //Mimic Persistence
  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
    })
  }

  //The sign in with popup method will trigger only google account sign in
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    //Batch Writing to prevent half way save due to any failure
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      //This line can generate a new id for each document
      const newDocumentRef = collectionRef.doc();
      batch.set(newDocumentRef, obj);
    });

    //This line will fire off the batch request and return us the promise
    return await batch.commit();
  }

  export const convertCollecitonsSnapShotToMaps = (collections) => {
    const transformCollection = collections.docs.map(doc => {
      const {title, items, routeName} = doc.data();
      return {
          routeName: encodeURI(routeName),
          id: doc.id,
          title,
          items
      };
    });
    return transformCollection.reduce((accumulator, collection) => {

      accumulator[collection.title.toLowerCase()] = collection;

      return accumulator;
    }, {})
    
  }

  export default firebase;