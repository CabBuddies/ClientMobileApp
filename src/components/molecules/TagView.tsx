import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Chip, Colors } from 'react-native-paper';
import Tags from "react-native-tags";
import reactotron from '../../../dev/ReactotronConfig';

interface ITagViewProps{
	tags:string[];
	bgColor?:any;
	rest?: any;
}

const TagView= ({tags,bgColor="rgba(25,35,255,1)",...rest}) => {
	const styles = StyleSheet.create({
		tagContainer:{
			paddingTop: 15,
			justifyContent:"space-between",
			padding:2,
		},
		tag:{
			justifyContent:"center",
			borderColor:bgColor,
			borderWidth:2,
			margin:3
		},
		tagText:{
			fontSize:18,
			color:bgColor
		},
	})
    return (
        <Tags
			initialTags = {tags}
			readonly
			containerStyle={styles.tagContainer}
			onTagPress={(index,tagLabel) => reactotron.log!(`${tagLabel} pressed`)}
			renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
			<Chip key={`${tag}-${index}`} onPress={onPress} mode="outlined"
			    style={[styles.tag]} 
				textStyle={styles.tagText}
			>
			{tag}
			</Chip>
			)}
			{...rest}
                />
	)
	
}

export default TagView;






