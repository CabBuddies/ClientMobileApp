import {deepEqual} from "deep-equal";


export function equal(a:any,b:any,errmsg:string='????'){
    if(deepEqual(a,b)===false)
        throw new Error(errmsg);
}