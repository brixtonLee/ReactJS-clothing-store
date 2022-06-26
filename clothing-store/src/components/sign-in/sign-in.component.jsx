import React, {useState} from "react";
import { FormInput } from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";
import './sign-in.styles.scss';
// import { auth } from "../../firebase/firebase.utils";

//firebase import to use sign in with google account method
// import { signInWithGoogle } from "../../firebase/firebase.utils"; 

import {googleSignInStart, emailSignInStart} from "../../redux/user/user.actions";

import { connect } from "react-redux";
const SignIn = ({emailSignInStart, googleSignInStart}) =>  {
    
    /*
        React Redux:
        1. Create the Action Types object in the types.js file
        2. Create the reducer object in the reducer.js file
        3. In the reducer, create the initial state
        4. Reducer is a function that has two params which are the state and action
        5. Inside the function implementation, write the switch case statement
        6. Create the actions file in the actions.js file

    */
    /* 
        React Hooks
        1. React Hooks can only be used in functional component

        React Hooks - useState
        1. It will be destructure into two elements in the array
        2. The first one is the state (any), the second one is the function to set the state
        3. The param in the useState function is the default value for the state
        4. E.g: const [userCredentials, setCredentials] = useState({email: '', password: ''});

        React Hooks - useEffect
        1. It consists of two params
        2. The first one is the function to be executed when the state in the second param changed if any
        3. If the empty array is given in the second param, then it will only execute once (mimic componentDidMount method)
        4. If there is no second param, the first param function will executed if any state in this component changed

    */

    /*
        Selector
        1. Whenever the reducer action is called and update the state (return the whole new object)
        2. The mapStateToProps function is called every single time
        3. Hence it will re-render the component
        4. For any state changed in any reducers, it will fire all the mapStateToProps actions and re-render the component due to the assignment of the new object
        5. Therefore, by using selector, we can prevent the mapStateToProps from being fired while any state that is unrelated changed in other reducers and improve the performance.
    */

    /*
        Reduce In JavaScript
        1. It will return one value only
        2. The first param is the function, the second param is the starting value
        3. The function has two params which are total and any
        4. If only return total, it will only return the first value of the array
    */

    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    /* The constructor can only be used in the class component
        constructor(props){
            super(props);

            this.state = {
                email: '',
                password: ''
            }    
        }
    */

    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        // const { emailSignInStart } =this.props;
        // const {email, password} = this.state;
        
        /*
            Redux Saga
            1. This emailSignInStart() function will call the actions in the user.actions.js file
            2. It will then triggered the onEmailSignInStart() generator function in the user.sagas.js file because the actions type is the same
            3. The param pass in this emailSignInStart() will be become the payload for the second param signInWithEmail() function of the onEmailSignInStart() generator function 
            4. The code written in the signInWithEmail() function will then be executed
            5. redux saga must consist of three actions, which are start, success and failure
        */
        emailSignInStart(email, password)

        /*
            Sign in with own email and passowrd Before Redux Saga
            try{
                await auth.signInWithEmailAndPassword(email, password);
                this.setState({email: '', password: ''})
            }
            catch(error){
                console.log(error);
            }
        */
    }

    const handleChange = event => {

        //Destructuring
        const {name, value} = event.target;

        // Need to put [name] hence it is referring to the value of name rather than 'name' property
        // this.setState({[name]: value})

        //React Hooks - useState
        setCredentials({...userCredentials, [name]: value});
    }

    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" value = {email} label="email" required handleChange={handleChange}/>
                <FormInput type="password" name="password" value = {password} label="password" required handleChange={handleChange}/>
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
                
            </form>
        </div>
    )

}

/*
    mapDispatchToProps is the function that will map the function from the reducer actions to this component
*/

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

/*
    connect consists of two params which are mapStateToProps and mapDispatchToProps
*/
export default connect(null,mapDispatchToProps)(SignIn);