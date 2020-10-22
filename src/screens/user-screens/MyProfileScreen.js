import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { JSONPrint } from "../../utils";
import { User } from "node-rest-objects/src/data/user-management/user";

export default function MyProfileScreen({ navigation }) {
    const [details, setDetails] = useState({});
    const getUser = () => {
        const user = new User();
        console.log("user:",user);
        user.getMe().then(() => {
            setDetails(user.data);
            console.log("user:",user);
        }).catch((err) => {
            console.log("error getting user details",err);
        });
    }
    useEffect(() => {
        getUser()
        console.log(details);
    },[])
    return(
        <View style={{ flex: 1}}>
            <JSONPrint data = {details} />
        </View>
    )
}