


import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        // case UserActionTypes.SET_CURRENT_USER:
        //     return {
                
        //         //This return the rest of props inside the state without the currentUser
        //         ...state,
        //         //Set the currentUser become the value of the payload
        //         currentUser: action.payload
        //     }
        default:
            //We dont have to return the new object so that the component wont get re-rendered
            return state;
    }
}

export default userReducer;