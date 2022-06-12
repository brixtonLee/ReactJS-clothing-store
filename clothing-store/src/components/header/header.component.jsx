import React from 'react';
import {Link } from 'react-router-dom';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';

//Cart
import CartIconComponent from '../cart-icon/cart-icon.component';
// import { CartIcon } from '../cart-icon/cart-icon.component';
// import { CartDropDown } from '../cart-dropdown/cart-dropdown.component';
import CartDropdownComponent from '../cart-dropdown/cart-dropdown.component';

//firebase
import { auth } from '../../firebase/firebase.utils';

//Redux
/*
    Higher order Component:
    1. Higher order Component is the function that takes component as the argument
*/
import { connect } from 'react-redux';


//Selector
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {createStructuredSelector} from 'reselect';

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link className='logo-container' to = "/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {currentUser ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>: <Link className='option' to='/signIn'>SIGN IN</Link>}
            <CartIconComponent/>
        </div>
        {
            hidden ? null :<CartDropdownComponent/>
        }
        

    </div>
)

/* The first argument of 'connect is the function that allows us to access to the state which is the mapStateToProps function */
// Before Destructuring
// const mapStateToProps = state => ({
//     currentUser: state.user.currentUser
// });

// After Desturcturing
//Before selector
// const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
//     currentUser,
//     hidden
// });

//After Selector
//Using the createStructuredSelector we can prevent the repetition of code
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden:selectCartHidden
});

export default connect(mapStateToProps)(Header);