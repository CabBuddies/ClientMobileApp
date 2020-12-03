import React, { useLayoutEffect, useRef } from 'react';
import { Alert, View } from 'react-native';
import {Content, Container, Footer, Text } from "native-base";
import { CButton as Button } from "../../../components/atoms"
import { Formik } from "formik";
import * as yup from "yup";
// import Reactotron from 'reactotron-react-native';
import { QueryForm } from '../../../components/organisms';
import { bindActionCreators } from 'redux';
import { editQuery, writeQuery } from "../../../redux/actions/query-actions";
import { connect } from 'react-redux';
import { Screens } from '../../../definitions/screen-definitions';
import { StackNavigationProp, HeaderBackButton } from "@react-navigation/stack";
import { QueryStackParamList } from "../../../navigations/QueryNavigator";
// import reactotron from '../..';
import { QueryFormType } from '../../../definitions/common-definitions';
import { IQuery, Query } from 'node-rest-objects/dist/data/queries';
import { updateQuery } from '../../../api/query-api';
import reactotron from '../../../../dev/ReactotronConfig';
import { goToQueryListScreen } from '../../../utils/nav-utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type CreateQueryScreenNav = StackNavigationProp<QueryStackParamList>;

interface CreateQueryScreenProps{
    navigation:CreateQueryScreenNav;
    createQuery:any;
    queryData:IQuery;
    loading?:boolean;
    error?:string;
    route?:any;
    changeQuery?:any
}
interface QFormValues{
    title:string;
    tags:string[];
    body:string;
    media:string[]
}
const defaultInitialValues:QFormValues ={
    title:"",
    tags: [],
    body:"",
    media:[]
}

const CreateQueryScreen = ({navigation, createQuery,queryData,loading,error,route,changeQuery}:CreateQueryScreenProps) => {
    
    const formRef:any = useRef();
    let formValues = defaultInitialValues;
    let isUpdate = false;
    if(route && route.params && route.params.formValues){
        formValues = route.params.formValues;
        isUpdate= true;
    }
    
    const querySchema = yup.object({
        title: yup.string().required("A title is Required"),
        tags: yup.array().min(1).required("Tags are Required"),
        body: yup.string().required("description is required"),
        media:yup.array()
    });

    const cancelNav = () => {
        navigation.navigate(Screens.GUIDE_ME);
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft:() => <HeaderBackButton onPress={cancelNav}/>,
            headerRight:() => (
                <Button transparent title="Post" container={{flex:0}} onPress={() => {
                    if(formRef.current)
                        formRef.current.handleSubmit()
                }} />
            )
        });
    },[navigation])
    return (
        <Container>
            <KeyboardAwareScrollView>
                <Formik
                    innerRef = {formRef}
                    initialValues = {formValues}
                    validationSchema={querySchema}
                    onSubmit = {(values,actions) => {
                        reactotron.log!("onSubmit","isUpdate",isUpdate,"Values",values);
                        if(!isUpdate){
                            createQuery(values).then(() => {
                                reactotron.log!("create-query-screen:",queryData,loading);
                                navigation.navigate(Screens.QUERY_VIEW,{name:values.title});
                            });
                        }
                        else{
                            reactotron.log!("CreateQueryScreen Pre Update");
                            try {
                                reactotron.log!("CreateQueryScreen Pre Update",queryData._id,values);
                                updateQuery(queryData._id,values).then(resp => {
                                    reactotron.log!("post-update-query",resp,values);
                                    goToQueryListScreen(navigation);
                                }).catch(error => {
                                    reactotron.log!("post-update-query-error",error);
                                })
                            } catch (error) {
                                reactotron.log!("CreateQueryScreen Update Error",error,queryData);
                            }
                        }
                        
                        actions.resetForm();
                        
                    }}
                >
                    {(props) => <QueryForm mode={QueryFormType.QUERY} formik={props}/>}
                </Formik>
                </KeyboardAwareScrollView>
        </Container>
    )
}
function mapStateToProps(state){
    const { queryState } = state;
    return {
        loading:queryState.loading,
        queryData:queryState.query?.data,
        error:queryState.error!
    }
}
function mapDispatchToProps(dispatch){
    return {
        createQuery: bindActionCreators(writeQuery,dispatch),
        changeQuery: bindActionCreators(editQuery,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateQueryScreen);
