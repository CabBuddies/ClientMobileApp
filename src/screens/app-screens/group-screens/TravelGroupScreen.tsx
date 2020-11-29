import React,{ useEffect } from 'react';
import { Text, View } from 'react-native';
import { ImagePicker } from '../../../components/organisms';
import { Button } from 'react-native-paper';
import RichTextEditor from '../../../components/organisms/RichTextEditor';
import SuggestionSearch from '../../../components/molecules/SuggestionSearch';
import RealtimeDatabase from 'node-rest-objects/dist/rest/realtime.database';

const options = {
    apiKey: "AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60",
    authDomain: "cabbuddies-1562982601192.firebaseapp.com",
    databaseURL: "https://cabbuddies-1562982601192.firebaseio.com",
    projectId: "cabbuddies-1562982601192",
    storageBucket: "cabbuddies-1562982601192.appspot.com",
    messagingSenderId: "1067716858916",
    appId: "1:1067716858916:web:298c461c0439c497d5b4b1",
    measurementId: "G-VQLJ1DMMJ5"
};

export default function TravelGroupScreen() {
    useEffect(() => {
        RealtimeDatabase.observePath({options,path:'/user/karthik',callback:(val)=>{console.log(val);}});
    },[])
    return (
        // <View>
        //     <Text>Travel Groups Screen.</Text>
        //     <ImagePicker />
            // <Button>Hello there</Button>
            <SuggestionSearch/>
        // </View>
    )
}
