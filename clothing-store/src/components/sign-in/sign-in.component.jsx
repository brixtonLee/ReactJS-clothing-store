import React from "react";
import { FormInput } from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";
import './sign-in.styles.scss';
import { auth } from "../../firebase/firebase.utils";

//firebase import to use sign in with google account method
import { signInWithGoogle } from "../../firebase/firebase.utils"; 
class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }    
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;


        //Sign in with own email and passowrd
        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        }
        catch(error){
            console.log(error);
        }

        
    }

    handleChange = event => {
        //Destructuring
        const {name, value} = event.target;
        //Need to put [] to wrap the name hence it is referring to the value of name rather than 'name' property
        this.setState({[name]: value})
    }

    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" value = {this.state.email} label="email" required handleChange={this.handleChange}/>
                    <FormInput type="password" name="password" value = {this.state.password} label="password" required handleChange={this.handleChange}/>
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn;