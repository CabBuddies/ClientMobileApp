import React,{ useState, useEffect } from 'react'
import { View, FlatList, Alert } from 'react-native'
import {Container, Content, Item, List, Text, Button} from 'native-base';
import { CButton } from '../../../components/atoms'
import { QueryPreview } from '../../../components/organisms'
import { createQuery } from "../../../api/query-api";
import { JSONPrint } from "../../../utils";
import { IQuery, Query } from 'node-rest-objects/dist/data/queries';



export default function TravelQueryScreen({navigation}) {
    const cards = [
        {key:"1", username: "Ed", body: {question: "How to get to San Salvador?", desc: "I need to get there ASAP"}, stats:{votes:10, comments:32, views:45}},
        {key:"2", username: "Al", body: {question: "How to get to Edford?", desc: "I need to get there ASAP"}, stats:{votes:15, comments:15, views:50}},
        {key:"3", username: "Winry", body: {question: "How to get to Edford?", desc: "I need to get there ASAP"}, stats:{votes:-4, comments:1, views:100}},
        {key:"4", username: "Lola", body: {question: "How to get to Briggs?", desc: "I need to get there ASAP"}, stats:{votes:-4, comments:0, views:45}},
    ]

    const draftTemplateRequest = {
        title:"What can I do about the BART being unavailable to San Jose",
        tags: ["BART","Bay Area","San Jose","Public Transport"],
        body: "It has been a while since the San Jose BART lines have been built,\
but the stations are still not open, what can I do about this? ",
    }
    const writeQuery = async (request) => {
        const response = await createQuery(request);
        setQueries(response);
    }
    const [queries,setQueries] = useState<Query|null>(null);
	useEffect( () => {
        writeQuery(draftTemplateRequest);
        console.log("queries-data:",queries?.getData());
	},[])

    const nav = (item) =>{
        navigation.navigate("QueryView",item);
    }
    const renderItem = ({item}) => {
        return <QueryPreview username = {item.username} body = {item.body} stats = {item.stats} itemNav ={() => nav(item)}/>
    }
    return (
        <Container>
            <JSONPrint data = {queries?.getData()}/>
            {/* <FlatList data = {cards} renderItem = {renderItem} keyExtractor = {item => item.key} ListFooterComponent = {
                <>
                    <CButton
                        rounded 
                        warning
                        title = "New Query"
                        onPress = {() => Alert.alert(`insert a Query`)}
                    />
                    
                </>
            }/> */}
            
            
             
        </Container>
    )
}