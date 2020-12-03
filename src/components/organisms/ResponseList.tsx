import React,{ useRef, useMemo, useState, useEffect } from 'react'
import { StyleSheet, FlatList, View, Alert} from 'react-native'
import { FullViewType, PlaceholderSize } from '../../definitions/common-definitions';
import {Colors, Text, Title, Button as PaperButton, Divider, Card, TextInput,List} from 'react-native-paper';
import PostFullView from './PostFullView';
import { ContentLoading } from '../molecules';
import { connect } from 'react-redux';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { IQuery, IResponse } from 'node-rest-objects/dist/data/queries';
import reactotron from 'reactotron-react-native';

import { bindActionCreators } from 'redux';
import { loadComments, writeComment, writeResponse } from '../../redux/actions/query-actions';
import BottomSheet from '@gorhom/bottom-sheet';
import { defaultRequest } from '../../definitions/query-definitions';

// type ResponseListProps = ReduxProps
interface IResponseListProps{
    queryData?:RESTObject<IQuery>;
    responses?:RESTObject<IResponse>[];
    loading?:boolean;
    error?:string;
    errorType?:string;
    newComments?:any;
    getComments?:any;
    newResponse?:any;
    sheetRef?:any;
}
const ResponseList = ({responses,loading,error,errorType,queryData,newResponse,getComments,sheetRef}:IResponseListProps) => {
    
    const [answers,setAnswers] = useState<RESTObject<IResponse>[]>([]);
    useEffect(() => {
        setAnswers(responses!);
    },[responses])

    const getCommentFunc = (item) => {
        getComments(item,defaultRequest)
        .then(() => {
            if(sheetRef.current){
                sheetRef.current.snapTo(1);
            }
        })
    }
    const renderResponse=({item}) => {
        return <PostFullView type={FullViewType.RESPONSE} onComment={() => getCommentFunc(item)} content={item} />
    }

    const memoizedRender = useMemo(() => renderResponse,[responses]);
    
    const renderEmptyComponent = () => {
        if(loading){
            return <ContentLoading size={PlaceholderSize.MEDIUM}/>
        }
        else if(error && errorType?.startsWith("response")){
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>☹ Oops! Could not fetch responses! please try again</Text>
                </View>
            )
        }
        else{
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.emptyText}>No Responses Yet!!!</Text>
                </View>
            )
        }
    }
    return (
        <FlatList data={answers} renderItem={memoizedRender}
            listKey = {"Responses-list"}
            keyExtractor = {item => (item)?item.data._id:`${Date.now()}`}
            ListEmptyComponent={renderEmptyComponent}
            ListHeaderComponent={() => (<Title style={styles.title}>RESPONSES</Title>)}
            ItemSeparatorComponent={() => <Divider />}
            extraData={responses}
        />
    )
}

function mapStateToProps(state){
    const { queryState } = state;
    const responses = queryState.response;
    return{
        loading:queryState.loading,
        queryData:queryState.query,
        responses:responses,
        error:queryState.error,
        errorType:queryState.errorType
    }
}

function mapDispatchToProps(dispatch){
    return {
        newComment: bindActionCreators(writeComment,dispatch),
        getComments: bindActionCreators(loadComments,dispatch),
        newResponse: bindActionCreators(writeResponse,dispatch),
    }
    
}

const connector = connect(mapStateToProps,mapDispatchToProps);
type ReduxProps = typeof connector;
export default connector(ResponseList);

const styles = StyleSheet.create({
    errorContainer:{
        flex:1,
        alignItems:"center",
        padding: 20,
    },
    errorText:{
        color:Colors.red300,
        fontSize:30
    },
    emptyText:{
        color:Colors.black,
        fontSize:20,
        paddingTop:20,
    },
    title:{
        color:Colors.blueA700,
        fontSize:20,
        alignSelf:"center"
    }
})
