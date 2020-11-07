import { IQueryStats } from "../../definitions/query-definitions";


export interface IAppState{
    authState:IAuthState;
    userState?:IUserState;
    queryState?:IQueryState;

}

export interface IAuthState{
    isSignedIn: boolean;
    anonymous?:boolean;
    authToken?:string;
    refreshToken?:string;
}

export interface IUserState{
    profileState:IProfileState;
    currentScreen:string;
}

export interface IProfileState{
    name: string;
    id:string;
    email:string;
    profileImageUrl?:string;
}

export interface IQueryState{
    queryStats:IQueryStats;
    
}

// export interface IRideState{
    
// }

// export interface IPackageState{
    
// }
const authState:IAuthState = {
    isSignedIn:false,
    anonymous:false,
    authToken:"",
    refreshToken:""
}
// const queryState:IQueryState={

// }
export const initialState:IAppState = {
    authState:authState
}
