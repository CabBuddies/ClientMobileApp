import React,{ useState, useEffect } from 'react'
import { FlatList, Alert } from 'react-native'
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
import { fetchAllQueries } from "../../../redux/actions/queryAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const defaultSearchRequest = {
    sort:{
        "createdAt":-1
    }
}


function TravelQueryScreen({navigation,cards,loading,error,getQueries}) {
   
    useEffect(() => {
        getQueries(defaultSearchRequest);
    },[])
    
    const nav = (item) =>{
        navigation.navigate(Screens.QUERY_VIEW,item);
    }
    const newQueryNav = () =>{
        navigation.navigate(Screens.QUERY_CREATE);
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
            
            <FlatList data = {cards?.result} renderItem = {renderItem} keyExtractor = {item => (item)?item.data._id:`${Date.now()}`} ListHeaderComponent = {
                <>
                    <CButton
                        rounded 
                        warning
                        title = "New Query"
                        onPress = {newQueryNav}
                    />
                </>
                
            } 
            ListEmptyComponent = {placeholder}
            />
              
        </Container>
    )
}
function mapStateToProps(state){
    const { queryListState } = state;
    return {
        cards:queryListState.queries,
        loading: queryListState.loading,
        error: queryListState.error
    }
}

function mapDispatchToProps(dispatch){
    return {
        getQueries: bindActionCreators(fetchAllQueries,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TravelQueryScreen);


// const [queryData,setData] = useState<IQuery | undefined >();
// const [queries,setQueries] = useState<Query|null>(null);
// const [cards,setCards] = useState<RESTObject<IQuery>[] | undefined>();
// const draftTemplateRequest = {
//     title:"What can I do about the BART being unavailable to San Jose",
//     tags: ["BART","Bay Area","San Jose","Public Transport"],
//     body: "It has been a while since the San Jose BART lines have been built,\
// but the stations are still not open, what can I do about this? ",
// }



// const writeQuery = async (request) => {
//     Reactotron.log!("in write query");
//     const response = await createQuery(request);
//     // Reactotron.log!("in write query- response",response);
//     setQueries(response);
//     // setData(queries?.getData());
// }

// const searchQuery = async (request) =>{
//     Reactotron.log!("in search query");
//     const response = await getAllQueries(request);
//     // Reactotron.log!("in search query|response",response);
//     setCards(response?.result);
// }

// useEffect( () => {
//     // Reactotron.log!("running use-effect");
//     // writeQuery(draftTemplateRequest);
//     searchQuery(defaultSearchRequest);
//     Reactotron.log!("queries-data:",cards);
    
// },[])

// useEffect( () => {
//     setData(queries?.getData());
// },[queries])