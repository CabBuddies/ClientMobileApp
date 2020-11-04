import { AuthActions, IAuthAction } from "../actions/actionTypes";
import {initialState, IAppState } from "./initialState";

export default function authReducer(state:IAppState = initialState, action:IAuthAction) {
    
    if(!state) return;

    switch (action.type) {
        case AuthActions.LOGIN:
            return { ...state, isSignedIn: action.isSignedIn};
        case AuthActions.LOGIN_ERROR:
            return { ...state, isSignedIn: action.isSignedIn };
        case AuthActions.ANONYMOUS:
            return { ...state, isSignedIn: action.isSignedIn };
        default:
        return state;
    }
}
