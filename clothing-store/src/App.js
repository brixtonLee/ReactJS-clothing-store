import './App.css';

import { Homepage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import HeaderComponent from './components/header/header.component';
import { SignInAndSignUp } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/check-out/check-out.component';

import {Route, Routes, Navigate} from 'react-router-dom';
import React from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

/* Redux: */
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

//Selector
import { selectCurrentUser } from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
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
    //Redux mapdispatchToprops
    const {setCurrentUser} = this.props;

    /* Firebase Authentication:
      1. The user will remain sign in (either refresh or reopen the page) until he/she clicks on the sign out button
      2. The onAuthStateChanged will be invoked whenever any details related to the user has changed (either from other sources, login, etc)
      3. The onAuthStateChanged is like a open subscription that will return the user
      4. Since it is a open subscription, hence we will want to close the subscription whenever we unmount this component (exit the application) to prevent memory leaks
      5. To close the subscription, we use unsubscribeFromAuth or any other variable with suitable name
      6. The userAuth behind async is referring to the user return from onAuthStateChanged
      
      Firestore
      1. In fire
    */

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //If user login with whatever method (email or goolge account)
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        // onSnapshot is to get the snapshot object and .data() method is to get the actual properties
        userRef.onSnapshot(snapshot => {

          // Assign object to current user state

          // Before redux
          // this.setState({currentUser: {id: snapshot.id, ...snapshot.data()}});

          //After redux

          setCurrentUser({id: snapshot.id, displayName:(snapshot.data()).displayName, email: (snapshot.data()).email});
        });
      }
      else{
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount(){
    //When the unmount lifecycle occurs, the subscription on the onAuthStateChanged will be closed
    this.unsubscribeFromAuth();
  }
   
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
  currentUser: selectCurrentUser
});

//Redux
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


/* The second argument of connect is mapDispatchToProps */
export default connect(mapStateToProps, mapDispatchToProps)(App);
