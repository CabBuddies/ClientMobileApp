import React from 'react'
import { Text, View } from 'native-base'
import { CButton as Button } from './'
import { Row, Col } from 'react-native-easy-grid';

export default function VotesAtom() {

    const votes = 0;

    return (
        <View>
            <Col>
                <Button
                    transparent
                    hasIcon
                    iconOnly
                    icon="md-arrow-up"
                    onPress={() => {
                        alert(`(: Up voted :)`);
                    }}
                />
            </Col>
            <Col>
                <Text>{votes}</Text>
            </Col>
            <Col>
                <Button
                    transparent 
                    hasIcon
                    iconOnly
                    icon="md-arrow-down"
                    onPress={() => {
                        alert(`): down voted :(`);
                    }}
                />
            </Col>
        </View>
    )
}
