import React from 'react'
import  CButton  from '../atoms/Button'
import { Text, View } from 'native-base'
import { Row, Col } from 'react-native-easy-grid';

export default function CommentsAtom({commentCount= 0}) {
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
                    onPress={() => {
                        alert(`happy commenting`);
                    }}
                />
            </Col>
        </>
    )
}
