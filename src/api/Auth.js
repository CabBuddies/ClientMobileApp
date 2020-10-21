import { Auth } from "node-rest-objects/src/data/user-management";
import { Query } from "node-rest-objects/src/data/queries"
import Headers from "node-rest-objects/src/rest/headers";
import {getOp, postOp} from "node-rest-objects/src/rest/rest.operations";
import { DOMAIN } from "node-rest-objects/src/rest/api";
import axios from "axios";


export async function signInApp(request){
    try{

    const {email, password} = request;
    console.log("request",request)
    const response = await Auth.login(email, password);

    console.log("response",response);
    // console.log("Headers",Headers.getAccessToken());
    // 
    return response;

    }
    catch(err){
        console.log("Error getting",err);
    }
}

export async function signUpApp(request)
{
    try {
      const { email, password, firstname, lastname } = request;
      console.log("request", request);
      const response = await Auth.register(email, password, firstname, lastname, "inapp");

      console.log("response", response);
      // console.log("Headers",Headers.getAccessToken());
      //
      return response;
    } catch (err) {
      console.log("Error getting", err);
    }
}

// export async function getUserDetails(token)
// {
//     try{

//     }
//     catch(err){
//         console.error(`error decoding the token`,{error:err.message});
//     }
// }
// Query creation example
// const query = new Query();
    // query.setDraft({
    //     title:"random title",
    //     tags: ["random","randomer","randomest"],
    //     body: "anything random that's quite random"
    // })
    // await query.create();
    // console.log("query: ",query);