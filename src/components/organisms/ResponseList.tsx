import React,{ useRef, useMemo } from 'react'
import { StyleSheet, FlatList, View} from 'react-native'
import { FullViewType, PlaceholderSize, QueryFormType } from '../../definitions/common-definitions';
import {Colors, Text, Title, Button as PaperButton, Divider } from 'react-native-paper';
import PostFullView from './PostFullView';
import { ContentLoading } from '../molecules';
import { connect } from 'react-redux';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { IQuery, IResponse } from 'node-rest-objects/dist/data/queries';
import reactotron from 'reactotron-react-native';
import { Formik } from 'formik';
import * as yup from "yup";
import QueryForm from './QueryForm';
import { bindActionCreators } from 'redux';
import { loadComments, writeComment, writeResponse } from '../../redux/actions/query-actions';

// type ResponseListProps = ReduxProps
interface IResponseListProps{
    queryData?:RESTObject<IQuery>;
    responses?:RESTObject<IResponse>[];
    loading?:boolean;
    error?:string;
    errorType?:string;
    newComments?:any;
    getComments?:any;
    newResponse?:any
}
const ResponseList = ({responses,loading,error,errorType,queryData,newResponse}:IResponseListProps) => {
    
    const formRef:any = useRef();
    const responseInitialValues = {
        title:"",
        tags: ["RESPONSE"],
        body:""
    }
    const querySchema = yup.object({
        title: yup.string().required("A title is Required"),
        body: yup.string().required("description is required")
    });
    const renderResponse=({item}) => {
        return <PostFullView type={FullViewType.RESPONSE} content={item} />
    }

    const memoizedRender = useMemo(() => renderResponse,[responses]);
    const submit= () => {
        if(formRef.current){
            formRef.current.handleSubmit();
        }
    }
    const headerComponent = () => (
        <View>
            <>
            <Title style={styles.title}>ADD RESPONSE</Title>
            <Formik
                    innerRef={formRef}
                    initialValues = {responseInitialValues}
                    validationSchema={querySchema}
                    onSubmit = {(values,actions) => {
                        // reactotron.log!(values);
                        newResponse(queryData,values).then(() => {
                        });
                        actions.resetForm();
                    }}
                >
                    {(props) => <QueryForm mode={QueryFormType.RESPONSE} formik={props}/>}
            </Formik>
            <PaperButton disabled ={loading} mode="text" onPress={submit} compact={true}>Post</PaperButton>
            </>
            <Title style={styles.title}>RESPONSES</Title>
        </View>
    )
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
                    <Text style={styles.emptyText}>No Responses Yet! for this query, mind creating one?😃</Text>
                </View>
            )
        }
    }
    return (
        <FlatList data={responses} renderItem={memoizedRender}
            keyExtractor = {item => (item)?item.data._id:`${Date.now()}`}
            ListEmptyComponent={renderEmptyComponent}
            ListHeaderComponent={headerComponent}
            ItemSeparatorComponent={() => <Divider />}
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
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
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
