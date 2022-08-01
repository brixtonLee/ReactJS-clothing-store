import './App.css';

import { Homepage } from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';
import HeaderComponent from './components/header/header.component';
import { SignInAndSignUp } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/check-out/check-out.component';

import {Route, Routes, Navigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

/* Redux: */
import { connect } from 'react-redux';

//React Hooks to replace normal redux
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCollections } from './redux/shop/shop.selector';

//Selector
import { selectCurrentUser } from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import { CollectionPreview } from './components/collection-preview/collection-preview.component';
import CollectionComponent from './components/collection/collection.component';

import { checkUserSession } from './redux/user/user.actions';

import { UseStateExample2 } from './pages/test.component';



//Normal Redux Solution
// const App = ({checkUserSession, currentUser}) =>  {

//React Hooks Solution
const App = () =>  {

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  /*
    constructor() {
      super();

      this.state = {
        currentUser: null
      }
    }
  */



  // const unsubscribeFromAuth = null;
  useEffect(() => {
    dispatch(checkUserSession());
  },[dispatch])

  // componentDidMount(){



    
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
    // const {checkUserSession} = this.props;
    // checkUserSession();
  // }

  // componentWillUnmount(){
    //When the unmount lifecycle occurs, the subscription on the onAuthStateChanged will be closed
    // this.unsubscribeFromAuth();
  // }
   
  // render() {

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
          <Route path='/signIn' element={currentUser ? <Navigate to='/' replace/> : <SignInAndSignUp/>}/>
          <Route path='/checkOut' element={<CheckOutPage/>}/>
          <Route path='/test' element={<UseStateExample2/>}/>
        </Routes>
          
      </div>
    )
  }
  
// }

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
// export default connect(mapStateToProps, mapDispatchToProps)(App);

/* React Hooks Solution */
export default App;
