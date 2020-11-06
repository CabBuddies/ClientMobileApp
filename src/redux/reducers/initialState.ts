import { IQueryStats } from "../../definitions/query-definitions";


export interface IAppState{
    authState:IAuthState;
    userState?:IUserState;
    queryState?:IQueryState;

}

interface IAuthState{
    isSignedIn: boolean;
    anonymous?:boolean;
    authToken?:string;
    refreshToken?:string;
}

interface IUserState{
    profileState:IProfileState;
    currentScreen:string;
}

interface IProfileState{
    name: string;
    id:string;
    email:string;
    profileImageUrl?:string;
}

interface IQueryState{
    queryStats:IQueryStats;
    
}

// interface IRideState{
    
// }

// interface IPackageState{
    
// }
const authState:IAuthState = {
    isSignedIn:false,
    anonymous:false,
    authToken:"",
    refreshToken:""
}
export const initialState:IAppState = {
    authState:authState
}
