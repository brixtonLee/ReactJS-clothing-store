/**
  Redux Reducer:
  1. Reducer is the function that has two arguments which are (state, action)
  2. action is the object that has the type (specific type of action), payload (anything)
  3. The state is going to be something (current state) that redux store is going to pass to the reducer whenever the action get fired
  4. We have to set the INITIAL STATE for the reducer for the purpose of first time
 */


import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return {
                
                //This return the rest of props inside the state without the currentUser
                ...state,
                //Set the currentUser become the value of the payload
                currentUser: action.payload
            }
        default:
            //We dont have to return the new object so that the component wont get re-rendered
            return state;
    }
}

export default userReducer;