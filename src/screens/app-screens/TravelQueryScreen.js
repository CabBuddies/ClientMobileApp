import React from 'react'
import { View } from 'react-native'
import {Container, Content, Card, Text} from 'native-base';
import { CButton as Button } from '../../components/atoms'
export default function TravelQueryScreen() {
    return (
        <Container>
            <Content>
                <Button
                    rounded warning
                    title = "New Query"
                />
            </Content>
        </Container>
    )
}

