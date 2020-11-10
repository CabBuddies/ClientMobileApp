

interface Common{
    loading?:boolean;
    error?:string;
}
export interface IAuthAction extends Common{
    type: AuthActions;
    isSignedIn:boolean;
    anonymous?:boolean;
    payload?:any;
} 
// export interface IQueryAction{
//     isSignedIn: boolean;
//     data: any
// } 

export enum FetchActions{
    BEGIN = "begin",
    SUCCESS = "success",
    FAILURE = "failure"
}
export enum AuthActions{
    LOGIN = "login",
    AUTH_ERROR = "login-error",
    SIGN_UP = "sign-up",
    ANONYMOUS = "anonymous"

}

export enum QueryActions{
    UP_VOTE = "up-vote",
    DOWN_VOTE = "down-vote"
}