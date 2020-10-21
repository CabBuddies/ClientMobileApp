import { DOMAIN, refreshAPI } from "node-rest-objects/src/rest/api";

const LOCAL_IP = "10.0.0.3"
const APIDefinitions = {
    USER_MANAGEMENT_LOCAL : `http://${LOCAL_IP}:4000`,
    QUERIES_LOCAL : `http://${LOCAL_IP}:4001`,
    GROUPS_LOCAL : `http://${LOCAL_IP}:4002`,
    CHATS_LOCAL : `http://${LOCAL_IP}:4003`
}

export const applyLocalDefinitions = () =>{
    
    DOMAIN.USER_MANAGEMENT = APIDefinitions.USER_MANAGEMENT_LOCAL,
    DOMAIN.QUERIES = APIDefinitions.QUERIES_LOCAL,
    // DOMAIN.GROUPS = APIDefinitions.GROUPS_LOCAL
    refreshAPI();

    console.log("Definitions RESET", DOMAIN);
}
