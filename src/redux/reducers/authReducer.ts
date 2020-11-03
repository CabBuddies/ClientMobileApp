import { AuthActions, IAuthAction } from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState, action:IAuthAction) {
    
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
