import React from 'react'
import { StyleSheet,View } from 'react-native';
import { Chip, Colors, Text } from 'react-native-paper';
import Tags from "react-native-tags";
import reactotron from '../../../dev/ReactotronConfig';
import { dh } from '../../utils/rn-utils';

const TagInput = ({tags, onTagChange,separators=[",",";",", "],bgColor="rgba(25,35,255,1)"}) => {
    
    const styles = StyleSheet.create({
        tagContainer:{
            paddingTop: 15,
            justifyContent:"space-evenly",
            padding:2
        },
        tag:{
			justifyContent:"center",
			borderColor:bgColor,
			borderWidth:2
		},
        tagText:{
            fontSize:15,
            color:bgColor
        },
        tagInput:{
            borderBottomColor:bgColor,
            borderBottomWidth:1,
            backgroundColor:"rgba(245,255,240,0.1)",
            borderRadius:0,
            height:dh(0.1)
        }
    })

    return (
        <>
        <Text style={{fontSize:20}}>Enter your tags below</Text>
        <Tags
            initialText = ""
            textInputProps = {{
                placeholder: "Type your tags, comma-separated",
                autoCorrect:false
            }}
            initialTags = {tags}
            inputContainerStyle={styles.tagInput}
            onChangeTags = {(text) => onTagChange('tags',text)}
            createTagOnString={separators}
            renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                <Chip key={`${tag}-${index}`} onPress={onPress} 
                    icon="close-circle"
                    style={[styles.tag]} 
                    textStyle={styles.tagText}
                >
                    {tag}
                </Chip>
                )}
            containerStyle={styles.tagContainer}
            tagTextStyle = {styles.tagText}
            style = {styles.tagContainer}
        />
        </>
    )
}

export default TagInput


