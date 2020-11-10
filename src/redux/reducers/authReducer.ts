import { AuthActions, IAuthAction } from "../actions/actionTypes";
import {initialState, IAuthState } from "./initialState";

export default function authReducer(state:IAuthState = initialState.authState, action:IAuthAction):IAuthState | undefined {
    
    if(!state) return;

    switch (action.type) {
        case AuthActions.LOGIN:
            return { ...state, isSignedIn: action.isSignedIn,tokens:action.payload!};
        case AuthActions.AUTH_ERROR:
            return { ...state, isSignedIn: action.isSignedIn,error:action.error!};
        case AuthActions.ANONYMOUS:
            return { ...state, isSignedIn: action.isSignedIn, anonymous:action.anonymous! };
        case AuthActions.LOGOUT:
            return {...state, isSignedIn:action.isSignedIn,anonymous:action.anonymous!,tokens:{}};
        case AuthActions.SIGN_UP:
            return { ...state, isSignedIn: action.isSignedIn,tokens:action.payload!};
        default:
        return state;
    }
}
