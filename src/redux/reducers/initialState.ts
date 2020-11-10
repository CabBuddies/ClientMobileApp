import { IQueryStats } from "../../definitions/query-definitions";

interface CommonStates{
    loading?:boolean;
    error?:string;
}

export interface IAppState{
    authState:IAuthState;
    userState?:IUserState;
    queryState?:IQueryState;

}


export interface IAuthState extends CommonStates{
    isSignedIn: boolean;
    anonymous?:boolean;
    tokens?:any;
}

export interface IUserState extends CommonStates{
    profileState:IProfileState;
    currentScreen:string;
}

export interface IProfileState extends CommonStates{
    name: string;
    id:string;
    email:string;
    profileImageUrl?:string;
}

export interface IQueryState extends CommonStates{
    queryStats:IQueryStats;
    
}

// export interface IRideState{
    
// }

// export interface IPackageState{
    
// }
const authState:IAuthState = {
    isSignedIn:false,
    anonymous:false,
    loading:false
}
// const queryState:IQueryState={

// }
export const initialState:IAppState = {
    authState:authState
}
