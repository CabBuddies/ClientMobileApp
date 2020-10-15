import React,{ useState } from 'react'
import { View } from 'react-native'
import { Card, CardItem, Text, Left, Body, Thumbnail } from 'native-base';
import placeholder from '../../../assets/avatar_placeholder.png';
import { QueryStats } from '../../components/molecules';

export default function Query({ username = "user", time = new Date().toISOString(), 
                                body = {question: "question??", desc: "Lots of content and lts description containing many words that they wont fit in a line"}, 
                                stats = {votes:0, comments:0, views:0 },
                                style = null }) {
    const [likeColor, setLike] = useState('black');
    const [dislikeColor,setDislike] = useState('black');
    time = time.split('T')[0];
    return (
        <Card style = {style}>
            <CardItem header button onPress= {() => alert(`header pressed`)}>
                <Left>
                    <Thumbnail source = {placeholder}/>
                    <Body>
                        <Text> {username} </Text> 
                        <Text note>{time}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody button onPress = {() => alert(`item clicked`)}>
            <Body>
                <Text> {body.question} </Text>
                <Text note> {body.desc} </Text> 
            </Body>
            </CardItem>
            <CardItem footer bordered style = {{alignItems:'center',height:50}}>
                <QueryStats stats = {stats}/>
            </CardItem>
        </Card>
    )
}
