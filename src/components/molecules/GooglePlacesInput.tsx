import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInput } from 'react-native-paper';
import { dw } from '../../utils/rn-utils';
const GOOGLE_PLACES_API_KEY = 'AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60';
const GooglePlacesInput = ({placeholder = "search",currentLocation = false, allSet = ()=>{}, onFocus = ()=>{}, onBlur = ()=>{},hide=false,elevation=0,top=0,onSuggestionsShowing=(b:boolean)=>{},onLocationChanged=(data:{lat:number,lng:number,raw:any})=>{}}) => {
    // let value:any=undefined;
    // if(placeholder==='from'){
    //     value="505 Hassinger Road, San Jose";
    // }
    const [isFound,setFound] = React.useState(false);
    React.useEffect(()=>{
      onSuggestionsShowing(isFound);
    },[isFound])
    return (
    <GooglePlacesAutocomplete
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en', // language of the results
      }}
      placeholder={placeholder}
      currentLocation={currentLocation}
      autoFillOnNotFound={(()=>{

        return false;
      })()}
      onNotFound={()=>{
        setFound(false);
      }}
      renderRow={(item)=>{
        if(!isFound){
          setFound(true);
        }
      return <Text style={{color:'red'}}>{item.description}</Text>
      }}
      fetchDetails
      
      onPress={(data, details) => {
        console.log(data, details); 
        
        allSet();
        setFound(false);

        const geometry = details?.geometry;
        
        onLocationChanged({
          lat:geometry!.location.lat,
          lng:geometry!.location.lng,
          raw:{data,details}
        })
      }}
      textInputHide={hide}
      enableHighAccuracyLocation
      textInputProps={{
        InputComp: TextInput,
        onFocus,
        onBlur,
        onChangeText:(text)=>{
          if(text==='')
            setFound(false);
        },
        //clearButtonMode:'never'
        // value
      }}
      styles={{
        textInputContainer:{
          // position:"absolute",
          // top,
          // zIndex:elevation,
          width:dw(0.9),
          marginHorizontal:dw(0.05)
        },
        listView:{
          // position:"absolute",
          // marginTop:top+55,
          zIndex:elevation+100000,
          width:dw(0.9),
          marginHorizontal:dw(0.05)
        }
      }}
    />
  );
};
export default GooglePlacesInput;