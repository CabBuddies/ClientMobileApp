import React from 'react'
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import {Container, Content, Text } from 'native-base';
import { Comment } from 'node-rest-objects/dist/data/queries';
import CommentView from './CommentView';
import reactotron from '../../../dev/ReactotronConfig';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine} from "rn-placeholder";
import { connect } from 'react-redux';

interface CommentViewProps{
    comments: Comment[];
    error:any;
    loading:boolean;
    loadComments?:any
}
const CommentListView = ({comments,error,loading }:CommentViewProps) => {

    const renderListItem = ({item}) => {
        reactotron.log!('rendering-item',item);
        return <CommentView comment={item}/>
    }
    const placeholder = () => {
        const x = new Array(10).fill({});
        let components;
        if(error){
            components = 
                    (<Content>
                        <Text style={{fontSize:30,color:"red"}}>Oops!Error fetching comments!, {error}</Text>
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
                            <PlaceholderLine width={30} />
                            <PlaceholderLine />
                        </Placeholder>
                )
            })
        }
        return (<>{components}</>);        
    }
    
    return (
                <View style ={{
                    backgroundColor:"white",
                }}>
                <FlatList data = {comments} renderItem = {renderListItem} 
                    keyExtractor = {item => (item)?item.data._id:`${Date.now()}`}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent = {placeholder}
                    // refreshControl = {<RefreshControl refreshing={loading} onRefresh={() => Alert.alert('this will refresh comments')}/>}
                />
                </View>
        )
    
}
function mapStateToProps(state){
    const { queryState } = state;
    return{
        comments:queryState.comment,
        loading:queryState.loading,
        error:queryState.error,
        errorType:queryState.errorType,
    }
}
// function mapDispatchToProps(dispatch){

// }
const connector = connect(mapStateToProps);
export default connector(CommentListView);
