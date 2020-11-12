import React,{ useState, useEffect } from 'react'
import { View, FlatList, Alert } from 'react-native'
import {Container, Content, Item, List, Text, Button} from 'native-base';
import { CButton } from '../../../components/atoms'
import { QueryPreview } from '../../../components/organisms'
import { createQuery, getAllQueries } from "../../../api/query-api";
import { JSONPrint } from "../../../utils";
import { IQuery, Query } from 'node-rest-objects/dist/data/queries';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine,Loader } from "rn-placeholder";
import Reactotron from "../../../../dev/ReactotronConfig";
import { Screens } from '../../../definitions/screen-definitions';



export default function TravelQueryScreen({navigation}) {
    const [queryData,setData] = useState<IQuery | undefined >();
    const [queries,setQueries] = useState<Query|null>(null);
    const [cards,setCards] = useState<RESTObject<IQuery>[] | undefined>();
    const draftTemplateRequest = {
        title:"What can I do about the BART being unavailable to San Jose",
        tags: ["BART","Bay Area","San Jose","Public Transport"],
        body: "It has been a while since the San Jose BART lines have been built,\
but the stations are still not open, what can I do about this? ",
    }

    const defaultSearchRequest = {
        sort:{
            "createdAt":1
        }
    }

    const writeQuery = async (request) => {
        Reactotron.log!("in write query");
        const response = await createQuery(request);
        // Reactotron.log!("in write query- response",response);
        setQueries(response);
        // setData(queries?.getData());
    }

    const searchQuery = async (request) =>{
        Reactotron.log!("in search query");
        const response = await getAllQueries(request);
        // Reactotron.log!("in search query|response",response);
        setCards(response?.result);
    }
    
	useEffect( () => {
        // Reactotron.log!("running use-effect");
        // writeQuery(draftTemplateRequest);
        searchQuery(defaultSearchRequest);
        Reactotron.log!("queries-data:",cards);
        
    },[])
    
    useEffect( () => {
        setData(queries?.getData());
	},[queries])

    const nav = (item) =>{
        navigation.navigate(Screens.QUERY_VIEW,item);
    }
    const placeholder = () => {
        const x = new Array(10).fill({});
        const components = x.map((e,i) => {
            return  (
                    <Placeholder
                        Left={PlaceholderMedia}
                        Animation={(props) => <Shine {...props} duration={2} reverse={false}/>}
                        key = {""+i}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                        
                    </Placeholder>
            )
        })
        return (<>{components}</>);        
    }
    

    const renderItem = ({item}) => {
        const data = item.data;
        const {author,published,stats,createdAt} = data;
        // Reactotron.log!(published);
        return <QueryPreview time ={createdAt} username = {author} query= {published} stats = {stats} itemNav ={() => nav(data)}/>
    }
    
    return (
        <Container>
            
            <FlatList data = {cards} renderItem = {renderItem} keyExtractor = {item => (item)?item.data._id:`${Date.now()}`} ListFooterComponent = {
                <>
                    <CButton
                        rounded 
                        warning
                        title = "New Query"
                        onPress = {() => Alert.alert(`insert a Query`)}
                    />
                </>
                
            } 
            ListEmptyComponent = {placeholder}
            />
              
        </Container>
    )
}