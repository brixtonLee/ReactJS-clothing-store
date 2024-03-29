import React, { useState } from 'react';

import { CustomButton } from '../custom-button/custom-button.component';
import { FormInput } from '../form-input/form-input.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

//Redux Saga
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

import './sign-up.styles.scss';

/*
    Redux:
    1. Reducer is the function that hold the state
    2. Root Reducer is the function that hold all the small reducer (App State)
    3. Small Reducer E.g Home Reducer, Shop Reducer is the slice of state that is related
    4. You need to reassign the object with the new property in order for the component to re-render

    Redux Implementation:
    1. yarn add redux-logger react-redux
*/

const SignUp = ({signUpStart}) => {
    const [userCredentials, setUserCredentials] = useState({displayName: '',email: '',password: '',confirmPassword: ''})
    const {displayName, email, password, confirmPassword} = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();

        // const {signUpStart} = this.props

        // const {displayName, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword){
            alert("Password don't match");
            return;
        }

        signUpStart({displayName, email, password});


        // try{
        //     //Use the createuserWithEmailAndPassword from the auth library of firebase
        //     const { user } = await auth.createUserWithEmailAndPassword(email, password);
        //     //call the createuserProfileDocument method from the firebase.util.js
        //     await createUserProfileDocument(user, {displayName});

            // this.setState({
            //     displayName: '',
            //     email: '',
            //     password: '',
            //     confirmPassword: ''
            // });
        // }
        // catch(error){
        //     console.log("Error: " + error);
        // }
        // this.setState({displayName: '', email: '', password: '', confirmPassword: ''})
    }

    const handleChange = event => {
        //Destructuring
        const {name, value} = event.target;
        //Need to put [] to wrap the name hence it is referring to the value of name rather than 'name' property
        // this.setState({[name]: value})
        setUserCredentials({...userCredentials, [name]: value});

    }
        return(
            <div className="sign-up">
                <h1 className="title">I do not have an account</h1>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <FormInput name="displayName" type="text" value = {displayName} label="displayName" required handleChange={handleChange}/>
                    <FormInput name="email" type="email" value = {email} label="email" required handleChange={handleChange}/>
                    <FormInput type="password" name="password" value = {password} label="password" required handleChange={handleChange}/>
                    <FormInput type="password" name="confirmPassword" value = {confirmPassword} label="confirmPassword" required handleChange={handleChange}/>
                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
                    
            </div>
        )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);