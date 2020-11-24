import React from 'react'
import { StyleSheet, FlatList, View} from 'react-native'
import { FullViewType, PlaceholderSize } from '../../definitions/common-definitions';
import {Colors, Text} from 'react-native-paper';
import PostFullView from './PostFullView';
import { ContentLoading } from '../molecules';
import { connect } from 'react-redux';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { IResponse } from 'node-rest-objects/dist/data/queries';
import reactotron from 'reactotron-react-native';

interface ResponseListProps{
    responses?:RESTObject<IResponse>[];
    loading?:boolean;
    error?:string;
    errorType?:string;
}
const ResponseList = ({responses,loading,error,errorType}:ResponseListProps) => {
    
    reactotron.log!("inside response-list",responses);
    const renderResponse=({item}) => {
        return <PostFullView type={FullViewType.RESPONSE} content={item} />
    }
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
                    <Text>No Responses Yet! for this query, mind creating one?😃</Text>
                </View>
            )
        }
    }
    return (
        <FlatList data={responses} renderItem={renderResponse}
            keyExtractor = {item => (item)?item.data._id:`${Date.now()}`}
            ListEmptyComponent={renderEmptyComponent}
        />
    )
}

function mapStateToProps(state){
    const { queryState } = state;
    const responses = queryState.response;
    return{
        loading:queryState.loading,
        responses:responses,
        error:queryState.error,
        errorType:queryState.errorType
    }
}

const connector = connect(mapStateToProps,null);

export default connector(ResponseList);

const styles = StyleSheet.create({
    errorContainer:{
        flex:1,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    },
    errorText:{
        color:Colors.red300,
        fontSize:30
    },
})
