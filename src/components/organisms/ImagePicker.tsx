import React, { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, HelperText } from 'react-native-paper';
import axios from 'axios';
import Constants from "expo-constants";
import { View } from 'react-native';


export default function ImagePickerContainer({ props, imageCB,allowEditing=true }) {
  const [image, setImage] = useState<any>('');
  const [uploading, toggleUploading] = useState(false);
  const [error, setError] = useState({error: false, message: ''});
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let properties:{
      base64:boolean,
      [key:string]:any
    } = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: allowEditing,
      aspect: [4, 3],
      quality: 1,
      base64: true
    };
    if(!allowEditing){
      delete properties['aspect'];
    }
    let result = await ImagePicker.launchImageLibraryAsync(properties);
    if (!result.cancelled) {
      toggleUploading(true);
      await uploadImage(result.base64 || '');
    }
  };
  async function uploadImage(base64: string) {
    let body = new FormData();
    body.append("image", base64);
    axios.request({
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${Constants.manifest.extra.imgbbKey}`,
      data: body
    }).then((response) => {
      console.log('image url: ', response.data.data.image.url);
      setSuccess(true);
      toggleUploading(false);
      setImage(response.data.data.image.url);
      console.log(`image state: `, image);
      imageCB(response.data.data.image.url);
    }).catch(err => {
      console.log(err.response.data);
      setError({
        error: true,
        message: err.response.data
      });
    });
  }
  return (
    <View style={{justifyContent: 'center'}} >
      <Button onPress={pickImage} icon={props.icon} loading={uploading} >{props.title}</Button>
      { error.error && <HelperText type="error" visible={error.error}>UPLOAD FAILED</HelperText>}
      { success && <HelperText type="info" visible={success}>SUCCESSFULLY UPLOADED</HelperText> }
    </View>
  );
}