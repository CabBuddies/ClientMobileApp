import { IGroup } from 'node-rest-objects/dist/data/groups';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Colors } from 'react-native-paper';
import { IUserDetails } from '../../definitions/common-definitions';
interface ICustomAvatarProps{
    data:IUserDetails | IGroup;
    rest?:any[];
    [val:string]:any
}
const CustomAvatar = ({data,rest,size=30}:ICustomAvatarProps) => {

	let text:string ='XD';
	if(data.firstName){
		text = data.firstName.charAt(0)+data.lastName.charAt(0);
	}
	else if(data.title){
		text = data.title.subString(0,2);
	}
	if(data?.displayPicture){
		const uri = data.displayPicture;
		return <Avatar.Image size={size} {...rest} source={{uri:uri}} />
	}
	else{
		return <Avatar.Text size={size} {...rest} style={{backgroundColor:Colors.blueA700}} label={text} />
	}
}
export default CustomAvatar
const styles = StyleSheet.create({})
