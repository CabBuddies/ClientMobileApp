import React,{ useState, useEffect } from 'react'
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import {Container, Content, Text } from 'native-base';
import { Comment, IQuery, IResponse } from 'node-rest-objects/dist/data/queries';
import CommentView from './CommentView';
import reactotron from '../../../dev/ReactotronConfig';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine} from "rn-placeholder";
import { connect } from 'react-redux';
import { TextInput as PaperInput, IconButton, Colors } from "react-native-paper";
import { Formik } from 'formik';
import { loadComments, writeComment } from '../../redux/actions/query-actions';
import { bindActionCreators } from 'redux';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { defaultRequest } from '../../definitions/query-definitions';
import { Grid,Row,Col } from 'react-native-easy-grid';
import { BottomSheetFlatList, TouchableOpacity as SheetTouchable } from '@gorhom/bottom-sheet'

type T = any
interface CommentViewProps{
    query:RESTObject<IQuery>;
    response?:RESTObject<IResponse>;
    comments: Comment[];
    error:any;
    loading:boolean;
    newComment:any
    getComments?:any;
    
}
const commentInitialValues = {
    comment:''
}
const CommentListView = ({query,comments,error,loading,getComments,newComment }:CommentViewProps) => {

    const renderListItem = ({item}) => {
        return <CommentView comment={item}/>           
    }
    const newCommentForm = () => {
        return (
            <Formik
                initialValues = {commentInitialValues}
                onSubmit = {(values,actions) => {
                    reactotron.log!(values);
                    newComment(query,values.comment).then(() => {
                        actions.resetForm()
                        // getComments(query,defaultRequest)
                    })
                    actions.setSubmitting(false)
                }}
            >
                {
                ({values,errors,handleBlur,setFieldValue,handleSubmit,isSubmitting}) => (
                    <Grid style={{padding:20}}>
                        <Row>
                            <Col size={6}>
                                <PaperInput
                                    label="enter your comment"
                                    value={values.comment}
                                    onChangeText = {(text) => setFieldValue('comment',text)}
                                    mode='outlined'
                                    underlineColor={Colors.brown50}
                                />
                            </Col>
                            <Col size={1}>
                                <SheetTouchable onPress={handleSubmit} disabled={isSubmitting || values.comment===""}>
                                    <IconButton icon="send" 
                                        disabled={isSubmitting || values.comment===""} color={Colors.brown600}
                                    />
                                </SheetTouchable>
                            </Col>
                        </Row>
                    </Grid>
                )
                }
            
            </Formik>
        )
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
        else if(loading){
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
        else{
            components = (
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text> NO COMMENTS YET </Text>
                </View>
            )
        }
        return (<>{components}</>);        
    }
    
    return (
                // <View style ={{
                //     backgroundColor:"white",
                // }}>
                <BottomSheetFlatList data = {(comments)?comments:[]} renderItem = {renderListItem} 
                    keyExtractor = {item => (item.data)?item.data._id:`${Date.now()}`}
                    ListHeaderComponent = {newCommentForm}
                    ListEmptyComponent = {placeholder}
                    contentContainerStyle={{backgroundColor:"white"}}
                    // refreshControl = {<RefreshControl refreshing={loading} onRefresh={() => Alert.alert('this will refresh comments')}/>}
                />
                // </View>
        )
    
}
function mapStateToProps(state){
    const { queryState } = state;
    return{
        query:queryState.query,
        comments:queryState.comment,
        loading:queryState.loading,
        error:queryState.error,
        errorType:queryState.errorType,
    }
}
function mapDispatchToProps(dispatch){
    return{
        getComments: bindActionCreators(loadComments,dispatch),
        newComment: bindActionCreators(writeComment,dispatch)
    }
}
const connector = connect(mapStateToProps,mapDispatchToProps);
export default connector(CommentListView);
