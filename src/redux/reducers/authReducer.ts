import { AuthActions, IAuthAction } from "../actions/actionTypes";
import {initialState, IAppState } from "./initialState";

export default function authReducer(state:IAppState = initialState, action:IAuthAction):IAppState | undefined {
    
    if(!state) return;

    switch (action.type) {
        case AuthActions.LOGIN:
            return { ...state, authState:{isSignedIn: action.isSignedIn}};
        case AuthActions.LOGIN_ERROR:
            return { ...state, authState:{isSignedIn: action.isSignedIn} };
        case AuthActions.ANONYMOUS:
            return { ...state, authState:{isSignedIn: action.isSignedIn, anonymous:true} };
        default:
        return state;
    }
}
