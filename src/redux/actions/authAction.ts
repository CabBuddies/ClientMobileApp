import * as types from './actionTypes';

export function login(userCredentials) {
    if(userCredentials.userName === "admin" && userCredentials.password === "admin") {
        return { type: types.LOGIN_SUCCESS, isSignedIn: true };   
    } else {
        return { type: types.LOGIN_ERROR, isSignedIn: false };
    }
}

export function guestUser() {
    return { type: types.GUEST_USER, isSignedIn: true };
}