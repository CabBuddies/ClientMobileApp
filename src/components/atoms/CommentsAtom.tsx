import React from 'react'
import  CButton  from './Button'
import { Text, View } from 'native-base'
import { Row, Col } from 'react-native-easy-grid';
import { Alert } from "react-native"

export default function CommentsAtom({commentCount= 0, onCommentPress = () => Alert.alert(`happy commenting`),commentDisabled=false}) {
    const comments =commentCount;
    return (
        <>
            <Col>
                <CButton
                    transparent 
                    hasIcon={true}
                    title = {`${comments}`}
                    icon="md-text"
                    iconLeft
                    container = {{flex:0}}
                    onPress={onCommentPress}
                    disabled = {commentDisabled}
                />
            </Col>
        </>
    )
}
