import './App.css';

import { Homepage } from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';
import HeaderComponent from './components/header/header.component';
import { SignInAndSignUp } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/check-out/check-out.component';

import {Route, Routes, Navigate} from 'react-router-dom';
import React from 'react';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

/* Redux: */
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCollections } from './redux/shop/shop.selector';

//Selector
import { selectCurrentUser } from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import { CollectionPreview } from './components/collection-preview/collection-preview.component';
import CollectionComponent from './components/collection/collection.component';

import { checkUserSession } from './redux/user/user.actions';


class App extends React.Component {
  //If we are using redux, we dont need to have the constructor anymore
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }


  unsubscribeFromAuth = null;

  componentDidMount(){
    // //Redux mapdispatchToprops
    // const {setCurrentUser, collections} = this.props;
    // // const {setCurrentUser} = this.props;
    // /* Firebase Authentication:
    //   1. The user will remain sign in (either refresh or reopen the page) until he/she clicks on the sign out button
    //   2. The onAuthStateChanged will be invoked whenever any details related to the user has changed (either from other sources, login, etc)
    //   3. The onAuthStateChanged is like a open subscription that will return the user
    //   4. Since it is a open subscription, hence we will want to close the subscription whenever we unmount this component (exit the application) to prevent memory leaks
    //   5. To close the subscription, we use unsubscribeFromAuth or any other variable with suitable name
    //   6. The userAuth behind async is referring to the user return from onAuthStateChanged
      
    //   Firestore
    //   1. In firestore, the query will always return to us two types of objects which are reference and snapshot, both of them can in either the Document or Collection version
    //   2. Query reference (can be in two types) is an object that represent the current place in the database
    //   3. Use .get() method we can get the snapshot object
    //   4. Document reference object is for the CRUD
    //   5. Collection reference is for adding new documents
    //   6. Document Reference return document snapshot (firestore.doc('name'))
    //   7. Collection Reference return query snapshot (firestore.collections('name'))
    //   8. 
    // */
    
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   //If user login with whatever method (email or goolge account)
    //   if(userAuth){
    //     const userRef = await createUserProfileDocument(userAuth);

    //     // onSnapshot is to get the snapshot object and .data() method is to get the actual properties
    //     userRef.onSnapshot(snapshot => {

    //       // Assign object to current user state

    //       // Before redux
    //       // this.setState({currentUser: {id: snapshot.id, ...snapshot.data()}});

    //       //After redux

    //       setCurrentUser({id: snapshot.id, displayName:(snapshot.data()).displayName, email: (snapshot.data()).email});
          
    //     });
    //     // addCollectionAndDocuments('collections', collections.map(({routeName,title, items}) => ({routeName,title, items})));
    //   }
    //   else{
    //     setCurrentUser(userAuth);
    //   }
    // })

    //check user session
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    //When the unmount lifecycle occurs, the subscription on the onAuthStateChanged will be closed
    // this.unsubscribeFromAuth();
  }

  /*
  React Hooks
    1. React hooks cannot be used inside the class component but in the functional component only
    2. Use State returns two things which can be accessed using array destructuring
    3. The first one is the state that we are trying to set
    4. The second thing is the function that we use to set the first param state
    5. What we passed into useState is the initial value that we want the state to be edited
    6. We can use as many useState as we want

    useEffect hook 
    1. It is mimicing the component did mount method and update life cycle method
    2. Whenever the component get re-rendered, this useEffect will be called
    3. The first param is the function that will get called whenever the component re-render, it must not be the async function
    4. The second param is the properties that if it has changed, the useEffect first param will be fired
    5. useEffect cannot be called inside the conditional component
  */
   
  render() {

    return (
      <div>
        {/* You place the header tag as here so that you could have it at all places despite of any routes */}
        {/* Before Redux */}
        {/* <Header currentUser = {this.state.currentUser}/> */}
        {/* After Redux */}
        <HeaderComponent/>
        {/* React routing */}
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/shop/:categoryID' element={<CollectionComponent/>}/>

          {/* Render is like the javascript invokation */}
          <Route path='/signIn' element={this.props.currentUser ? <Navigate to='/' replace/> : <SignInAndSignUp/>}/>
          <Route path='/checkOut' element={<CheckOutPage/>}/>
        </Routes>
          
      </div>
    )
  }
  
}

//Before selector
// const mapStateToProps = ({user}) => ({
//   currentUser: user.currentUser
// })

//After selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collections: selectCollections
});

//Redux
const mapDispatchToProps = dispatch => ({
  // setCurrentUser: user => dispatch(setCurrentUser(user))
  checkUserSession: () => dispatch(checkUserSession())
});


/* The second argument of connect is mapDispatchToProps */
export default connect(mapStateToProps, mapDispatchToProps)(App);
