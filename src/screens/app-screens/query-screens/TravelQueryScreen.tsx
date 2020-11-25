import React,{ useState, useEffect, useLayoutEffect } from 'react'
import { FlatList, Alert, RefreshControl } from 'react-native'
import {Container, Content, Item, List, Text, Button} from 'native-base';
import { CButton } from '../../../components/atoms'
import { QueryPreview } from '../../../components/organisms'
import { createQuery, getAllQueries } from "../../../api/query-api";
import { JSONPrint } from "../../../utils";
import { IQuery, Query } from 'node-rest-objects/dist/data/queries';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine,Loader } from "rn-placeholder";
import Reactotron from "../../../../dev/ReactotronConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { QueryStackParamList } from "../../../navigations/QueryNavigator";
import { Screens } from '../../../definitions/screen-definitions';
import { fetchAllQueries } from "../../../redux/actions/query-list-action"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchQuery } from '../../../redux/actions/query-actions';
import SearchRESTObject from 'node-rest-objects/dist/rest/search.rest.object';
import { IQueryListResponse } from '../../../definitions/query-definitions';

interface QueryRequest{
    query?:any
    pageNum?:number;
    pageSize?:number;
    sort?:Record<string,any>
}
enum ResultOrder{
    ASCENDING = 1,
    DESCENDING =-1
}
type TQScreenNav = StackNavigationProp<QueryStackParamList>;
interface TravelQueryScreenProps{
    navigation: TQScreenNav;
    cards: IQueryListResponse;
    loading:boolean;
    error:string;
    getQueries:any;
    getQuery:any;
}
// enum EditRequest{
//     LOAD_MORE = "load-more",
//     SORT_CHANGE = "sort-change",

// }
// const makeRequest = (type:EditRequest,changedVal):QueryRequest{
//     switch(type){
//         case EditRequest.LOAD_MORE:
//             retunr
//     }

// }
const defaultSearchRequest:QueryRequest = {
    query:{
        "status":"published"
    },
    sort:{
        "createdAt":ResultOrder.DESCENDING
    },
    pageNum:1
}


function TravelQueryScreen({navigation,cards,loading,error,getQueries,getQuery}:TravelQueryScreenProps) {
   
    useEffect(() => {
        getQueries(defaultSearchRequest);
    },[])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight:() => (
                    <CButton transparent title="Create" container={{flex:0}} onPress={newQueryNav} />
                )
            
        })
    })
    
    const nav = (item) =>{
        getQuery(item).then( () => {
            navigation.navigate(Screens.QUERY_VIEW,{name:"Query View"});
        });
        
    }
    const newQueryNav = () =>{
        navigation.navigate(Screens.QUERY_CREATE);
    }
    const placeholder = () => {
        const x = new Array(10).fill({});
        let components;
        if(error){
            components = 
                    (<Content>
                        <Text style={{fontSize:30,color:"red"}}>Oops!Error fetching queries!</Text>
                    </Content>)
        }
        else{
            components = x.map((e,i) => {
                return  (
                        <Placeholder
                            Left={PlaceholderMedia}
                            Animation={(props) => <Shine {...props} reverse={false}/>}
                            key = {""+i}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                            
                        </Placeholder>
                )
            })
        }
        
        return (<>{components}</>);        
    }
    

    const renderItem = ({item}) => {
        // Reactotron.log!(published);
        return <QueryPreview query={item} itemNav ={() => nav(item)}/>
    }
    
    return (
        <Container>
            
            <FlatList data = {cards?.result} renderItem = {renderItem} 
                keyExtractor = {item => (item)?item.data._id:`${Date.now()}`}
                ListEmptyComponent = {placeholder}
                refreshControl = {<RefreshControl refreshing={loading} onRefresh={() => getQueries(defaultSearchRequest)}/>}
                
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
        getQueries: bindActionCreators(fetchAllQueries,dispatch),
        getQuery: bindActionCreators(fetchQuery,dispatch)
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