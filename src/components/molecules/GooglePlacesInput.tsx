import React from 'react';
import { Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInput } from 'react-native-paper';
 
const GOOGLE_PLACES_API_KEY = 'AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60';
 
const GooglePlacesInput = ({placeholder = "search"}) => {
  return (
    <GooglePlacesAutocomplete
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en', // language of the results
      }}
      placeholder={placeholder}
      onPress={(data, details) => console.log(data, details)}
      textInputProps={{
        InputComp: TextInput
      }}
      styles={{
        textInput:{
          elevation:2
        },
        listView:{
          elevation:1,
          position:"absolute"
        }
      }}
    />
  );
};
 
export default GooglePlacesInput;