// auth actions
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_ERROR = "LOGIN_ERROR";
// export const SIGNUP = "SIGNUP";
// export const GUEST_USER = "GUEST_USER";

// // tq actions
// export const UP_VOTE = "UP_VOTE";
// export const DOWN_VOTE = "DOWN_VOTE";
export interface IAuthAction{
    type: AuthActions;
    isSignedIn: boolean;
    data?: any
} 
// export interface IQueryAction{
//     isSignedIn: boolean;
//     data: any
// } 

export enum AuthActions{
    LOGIN = "login",
    LOGIN_ERROR = "login-error",
    SIGN_UP = "signup",
    ANONYMOUS = "anonymous"

}

export enum QueryActions{
    UP_VOTE = "up-vote",
    DOWN_VOTE = "down-vote"
}