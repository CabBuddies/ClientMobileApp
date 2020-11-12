import { IQuery } from "node-rest-objects/dist/data/queries";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { IQueryStats } from "../../definitions/query-definitions";
import { Screens } from "../../definitions/screen-definitions";

interface CommonStates{
    loading?:boolean;
    error?:string;
}

export interface IAppState{
    authState:IAuthState;
    userState?:IUserState;
    queryListState?:IQueryListState;
    queryState?:IQueryState;

}


export interface IAuthState extends CommonStates{
    isSignedIn: boolean;
    anonymous?:boolean;
    tokens?:any;
}

export interface IUserState extends CommonStates{
    profileState:IProfileState;
    currentScreen:Screens;
}

export interface IProfileState extends CommonStates{
    name: string;
    id:string;
    email:string;
    profileImageUrl?:string;
}

export interface IQueryListState extends CommonStates{
    queries: RESTObject<IQuery>[] | undefined;
}

export enum QueryStatus{
    PUBLISHED = "published",
    DRAFT = "draft"
}
export interface IQueryState extends CommonStates{
    query: IQuery;
    stats: IQueryStats;
    status: QueryStatus;
    currentUserOpinion: string;
    response:any;
    comment:any;
    access?: any;
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
        id: "123456",
        name:"anonymous user",
        email:"anonymous",
    },
    currentScreen:Screens.APP
}
// const queryState:IQueryState={

// }
export const initialState:IAppState = {
    authState:defaultAuthState,
    queryListState: defaultQueryListState,
    userState:defaultUserState
}
