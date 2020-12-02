import React from 'react';
import { Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInput } from 'react-native-paper';
const GOOGLE_PLACES_API_KEY = 'AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60';
const GooglePlacesInput = ({placeholder = "search",currentLocation = false, allSet = ()=>{}, onFocus = ()=>{}, onBlur = ()=>{},hide=false}) => {
    // let value:any=undefined;
    // if(placeholder==='from'){
    //     value="505 Hassinger Road, San Jose";
    // }
    return (
    <GooglePlacesAutocomplete
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en', // language of the results
      }}
      placeholder={placeholder}
      currentLocation={currentLocation}
      onPress={(data, details) => {
        console.log(data, details); 
        
        allSet();

      }}
      textInputHide={hide}
      
      textInputProps={{
        InputComp: TextInput,
        onFocus,
        onBlur,
        // value
      }}
    //   styles={{
    //     textInput:{
    //       elevation:2
    //     },
    //     listView:{
    //       position:"absolute"
    //     }
    //   }}
    />
  );
};
export default GooglePlacesInput;