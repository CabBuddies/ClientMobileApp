import React from 'react'
import { View, FlatList } from 'react-native'
import {Container, Content, Item, List, Text, Button} from 'native-base';
import { CButton } from '../../components/atoms'
import { Query } from '../../components/organisms'
export default function TravelQueryScreen() {
    const cards = [
        {key:"1", username: "Ed", body: {question: "How to get to San Salvador?", desc: "I need to get there ASAP"}, stats:{votes:10, comments:32, views:45}},
        {key:"2", username: "Al", body: {question: "How to get to Edford?", desc: "I need to get there ASAP"}, stats:{votes:15, comments:15, views:50}},
        {key:"3", username: "Winry", body: {question: "How to get to Edford?", desc: "I need to get there ASAP"}, stats:{votes:-4, comments:1, views:100}},
        {key:"4", username: "Lola", body: {question: "How to get to Briggs?", desc: "I need to get there ASAP"}, stats:{votes:-4, comments:0, views:45}},
    ]

    const renderItem = ({item}) => {
        return <Query username = {item.username} body = {item.body} stats = {item.stats} />
    }
    return (
        <Container>
            
            <FlatList data = {cards} renderItem = {renderItem} keyExtractor = {item => item.key} ListFooterComponent = {
                <>
                    <CButton
                        rounded 
                        warning
                        title = "New Query"
                        onPress = {() => alert(`insert a Query`)}
                    />
                </>
            }/>

             
        </Container>
    )
}