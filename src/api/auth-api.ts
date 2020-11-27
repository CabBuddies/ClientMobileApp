import { Query } from "node-rest-objects/dist/data/queries/query";
import { Auth, IUser } from "node-rest-objects/dist/data/user-management";
import Reactotron from "../../dev/ReactotronConfig";
// import { Query } from "node-rest-objects/src/data/queries"
// import Headers from "node-rest-objects/src/rest/headers";
// import {getOp, postOp} from "node-rest-objects/src/rest/rest.operations";
// import { DOMAIN } from "node-rest-objects/src/rest/api";
// import axios from "axios";


export async function signInApp(request:any){
   
    const {email, password} = request;
    Reactotron.log!("request",request)
    let response:any;
    await Auth.login(email, password).then((resp) => {
      Reactotron.log!("response",resp);
      response = resp;
    })
    .catch((err) => {
      Reactotron.log!("error in Auth",err,err.name,err.message);
      throw err;
    });
    return response;

}

export async function signUpApp(request:any)
{
    try {
      let { email, password, firstname, lastname ,registrationType,displayPicture } = request;
      registrationType = registrationType || "inapp";
      displayPicture= displayPicture || "";
      Reactotron.log!("request", request);
      const response = await Auth.register(email, password, firstname, lastname, registrationType, displayPicture);
      return response;
    } catch (err) {
      Reactotron.log!("Error in signUp API", err);
      throw err;
    }
}

export async function signOutApi(){
    try{
      const response = await Auth.signOut();
      return response;
    }
    catch(err){
      Reactotron.log!("Error in signOut API", err);
      throw err;
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
