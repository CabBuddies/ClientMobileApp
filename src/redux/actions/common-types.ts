import { ErrorType } from "../initialState";
import { actionCreatorGenerator, typeGenerator } from "../generators";
import { FetchActions, CoreActions } from "./action-types";

export interface ApiError{
    message: string;
    name?: number;
    [key:string] : any;
}

export interface Common{
    loading?:boolean;
    error?:string;
    errorType?:ErrorType;
}

export interface IFetchAction{
    type:string;
    loading:boolean;
    payload?:any;
    error?:string;
    errorType?:string;
}

// export interface IFetchActionCreators{
//     getFetchLoading: () => IFetchAction;
//     getFetchFailure: (error:ApiError) => IFetchAction;
//     getFetchSuccess: (data:any) => IFetchAction;
// }

const createLoadingAction = name => ():IFetchAction => {
    return {
        type:typeGenerator(name,FetchActions.BEGIN),
        loading:true,
        payload:undefined,
        error:undefined,
        errorType:undefined
    }
}

const createFailureAction = name => (error:ApiError):IFetchAction => {
    return {
        type:typeGenerator(name,FetchActions.FAILURE),
        loading:false,
        payload:undefined,
        error:error.message,
        errorType:typeGenerator(name,"error")
    }
}
const createSuccessAction = name => (data):IFetchAction => {
    return {
        type:typeGenerator(name,FetchActions.SUCCESS),
        loading:false,
        payload:data
    }
}

export const apiActionGenerator = (coreName:CoreActions,params?:any):Record<string,any> =>{
    return actionCreatorGenerator(
        coreName,
        {
            createLoadingAction,
            createFailureAction,
            createSuccessAction
        },
        params
    )
}


