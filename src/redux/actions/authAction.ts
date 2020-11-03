import { AuthActions, IAuthAction }  from './actionTypes';


export function login(userCredentials):IAuthAction {
    if(userCredentials.userName === "admin" && userCredentials.password === "admin") {
        return { type: AuthActions.LOGIN, isSignedIn: true };   
    } else {
        return { type: AuthActions.LOGIN_ERROR, isSignedIn: false };
    }
}

export function guestUser():IAuthAction {
    return { type: AuthActions.ANONYMOUS, isSignedIn: true };
}