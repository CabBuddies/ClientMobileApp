import { IQuery } from "node-rest-objects/dist/data/queries";
import { IUser } from "node-rest-objects/dist/data/user-management";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { IQueryStats } from "../definitions/query-definitions";
import { Screens } from "../definitions/screen-definitions";

export enum ErrorType{
    QUERY = "query-error",
    COMMENT = "comment-error",
    RESPONSE = "response-error",
    USER = "user-error",
}
interface CommonStates{
    loading?:boolean;
    error?:string;
    errorType?:ErrorType;
}

export interface IAppState{
    authState:IAuthState;
    userState:IUserState;
    queryListState:IQueryListState;
    queryState:IQueryState;

}


export interface IAuthState extends CommonStates{
    isSignedIn: boolean;
    anonymous?:boolean;
    tokens?:any;
}

export interface IUserState extends CommonStates{
    profileState:IProfileState;
    currentScreen?:Screens;
}

export interface IProfileState extends CommonStates,IUser{
}

export interface IQueryListState extends CommonStates{
    queries: RESTObject<IQuery>[] | undefined;
}

export enum QueryStatus{
    PUBLISHED = "published",
    DRAFT = "draft"
}
export interface IQueryState extends CommonStates{
    query: RESTObject<IQuery>| undefined;
    currentUserOpinion?: string;
    response?:any;
    comment?:any;
}

// export interface IRideState{
    
// }

// export interface IPackageState{
    
// }
const defaultAuthState:IAuthState = {
    isSignedIn:false,
    anonymous:false,
    loading:false
}
const defaultQueryListState:IQueryListState = {
    queries: undefined
}
const defaultUserState:IUserState = {
    profileState: {
        _id: "123456",
        userId:"123456",
        firstName:"anonymous",
        lastName:"user",
        email:"anonymous",
        displayPicture:""
    },
    currentScreen:Screens.APP
}
const defaultQueryState:IQueryState = {
    query:undefined
}
// const queryState:IQueryState={

// }
export const initialState:IAppState = {
    authState:defaultAuthState,
    queryListState: defaultQueryListState,
    queryState:defaultQueryState,
    userState:defaultUserState
}
