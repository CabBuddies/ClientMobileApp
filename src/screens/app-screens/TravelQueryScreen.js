import React from 'react'
import { View, FlatList } from 'react-native'
import {Container, Content, Item, List, Text} from 'native-base';
import { CButton as Button } from '../../components/atoms'
import { Query } from '../../components/organisms'
export default function TravelQueryScreen() {
    const cards = [
        {key:1, username: "Ed", body: {question: "How to get to San Salvador?", desc: "I need to get there ASAP"}},
        {key:2, username: "Al", body: {question: "How to get to Edford?", desc: "I need to get there ASAP"}},
        {key:3, username: "Winry", body: {question: "How to get to Edford?", desc: "I need to get there ASAP"}},
        {key:4, username: "Lola", body: {question: "How to get to Briggs?", desc: "I need to get there ASAP"}},
    ]

    const renderItem = ({item}) => {
        return <Query username = {item.username} body = {item.body} />
    }
    return (
        <Container>
            <Content>
            <FlatList data = {cards} renderItem = {renderItem} keyExtractor = {item => item.key}/>

             <Query/>
                <Button
                    rounded warning
                    title = "New Query"
                />
            </Content>
        </Container>
    )
}

