import { Query } from "node-rest-objects/dist/data/queries/query";
import { Auth, IUser } from "node-rest-objects/dist/data/user-management";
// import { Query } from "node-rest-objects/src/data/queries"
// import Headers from "node-rest-objects/src/rest/headers";
// import {getOp, postOp} from "node-rest-objects/src/rest/rest.operations";
// import { DOMAIN } from "node-rest-objects/src/rest/api";
// import axios from "axios";


export async function signInApp(request:any){
   

    const {email, password} = request;
    console.log("request",request)
    let response:any;
    await Auth.login(email, password).then((resp) => {
      console.log("response",resp);
      response = resp;
    })
    .catch((err) => {
      console.log("error in Auth",err,err.name,err.message);
      throw err;
    });

    // const query = new Query();
    // query.setDraft({
    //     title:"random title",
    //     tags: ["random","randomer","randomest"],
    //     body: "anything random that's quite random"
    // })
    // await query.create();
    // console.log("query: ",query);
    return response;

}

export async function signUpApp(request:any)
{
    try {
      const { email, password, firstname, lastname } = request;
      console.log("request", request);
      const response = await Auth.register(email, password, firstname, lastname, "inapp");
      return response;
    } catch (err) {
      console.log("Error getting", err);
      throw err;
    }
}

// export async function signOut(request){
//     try{
//     }
//     catch(err){

//     }
// }

// export async function getUserDetails(token)
// {
//     try{

//     }
//     catch(err){
//         console.error(`error decoding the token`,{error:err.message});
//     }
// }
// Query creation example
