import React from 'react'
import { CButton as Button } from './'
import { Text, View } from 'native-base'
import { Row, Col } from 'react-native-easy-grid';

export default function CommentsAtom() {
    const comments = 10;
    return (
        <View>
            <Col>
                <Button
                    transparent 
                    hasIcon={true}
                    iconOnly={true}
                    icon="md-text"
                    onPress={() => {
                        alert(`happy commenting`);
                    }}
                />
            </Col>
            <Col>
                <Text>{comments}</Text>
            </Col>
        </View>
    )
}
