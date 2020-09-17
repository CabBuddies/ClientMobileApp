import React from 'react'
import { View } from 'react-native'
import {Container, Content, Card, Text} from 'native-base'
import { CButton as Button } from '../../components/atoms'
import Query from '../../components/organisms/Query'

export default function TravelQueryScreen() {
    return (
        <Container>
            <Content>
             <Query/>
                <Button
                    rounded 
                    warning
                    title = "New Query"
                />
            </Content>
        </Container>
    )
}