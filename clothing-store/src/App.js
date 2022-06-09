import './App.css';
import { Homepage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import { Header } from './components/header/header.component';
import { SignInAndSignUp } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {Route, Routes} from 'react-router-dom';
import React from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  //Since it is a open subscription, hence we will want to close the subscription whenever we unmount this component (exit the application) to prevent memory leaks
  unsubscribeFromAuth = null;
  componentDidMount(){
    //The user will remain sign in (either refresh or reopen the page) until he/she clicks on the sign out button
    //The onAuthStateChanged will be invoked whenever any details related to the user has changed (either from other sources, login, etc)
    //The onAuthStateChanged is like a open subscription that will return the user
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {this.setState({currentUser: user}); console.log(user.uid)})
    // The user behind async is referring to the user return from onAuthStateChanged
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        // onSnapshot is to get the snapshot object and .data() method is to get the actual properties
        userRef.onSnapshot(snapshot => {
          // Assign object to current user
          this.setState({currentUser: {id: snapshot.id, ...snapshot.data()}},
          () => {
            console.log(this.state);
          });
        });
      }
      else{
        this.setState({currentUser:null});
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
        <Header currentUser = {this.state.currentUser}/>
        {/* React routing */}
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/signIn' element={<SignInAndSignUp/>}/>
        </Routes>
          
      </div>
    )
  }
  
}

export default App;
