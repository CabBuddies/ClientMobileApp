import React from 'react'
import { CButton as Button } from './'
import { Text, View } from 'native-base'
import { Row, Col } from 'react-native-easy-grid';

export default function CommentsAtom() {
    const comments = 10;
    return (
        <>
            <Col>
                <Button
                    transparent 
                    hasIcon={true}
                    title = {comments}
                    icon="md-text"
                    iconLeft
                    onPress={() => {
                        alert(`happy commenting`);
                    }}
                />
            </Col>
        </>
    )
}
