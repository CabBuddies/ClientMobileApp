import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.isSignedIn, action) {
    
    if(typeof state === 'undefined') return;

    switch (action.type) {
        case types.LOGIN_SUCCESS:
        return { ...state, isSignedIn: action.isSignedIn };
        case types.LOGIN_ERROR:
            return { ...state, isSignedIn: action.isSignedIn };
        case types.GUEST_USER:
            return { ...state, isSignedIn: action.isSignedIn };
        default:
        return state;
    }
}
