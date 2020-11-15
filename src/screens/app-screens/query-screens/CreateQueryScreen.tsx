import React, { useLayoutEffect } from 'react';
import { Alert, View } from 'react-native';
import {Content, Container, Footer, Text } from "native-base";
import { CButton as Button } from "../../../components/atoms"
import { Formik } from "formik";
import * as yup from "yup";
import Reactotron from 'reactotron-react-native';
import { QueryForm } from '../../../components/organisms';
import { bindActionCreators } from 'redux';
import { writeQuery } from "../../../redux/actions/query-actions";
import { connect } from 'react-redux';
import { Screens } from '../../../definitions/screen-definitions';
import { StackNavigationProp, HeaderBackButton } from "@react-navigation/stack";
import { QueryStackParamList } from "../../../navigations/QueryNavigator";

type CreateQueryScreenNav = StackNavigationProp<QueryStackParamList>;

interface CreateQueryScreenProps{
    navigation:CreateQueryScreenNav;
    createQuery:any;
    queryData:any;
    loading?:boolean;
    error?:string;
}

const CreateQueryScreen = ({navigation, createQuery,queryData,loading,error}:CreateQueryScreenProps) => {
    
    Reactotron.log!("exec entered CreateQueryScreen");
    const queryInitialValues = {
        title:"",
        tags: [],
        body:""
    }
    const querySchema = yup.object({
        title: yup.string().required("A title is Required"),
        tags: yup.array().min(1).required("Tags are Required"),
        body: yup.string().required("description is required")
    });

    const cancelNav = () => {
        navigation.navigate(Screens.GUIDE_ME);
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft:() => <HeaderBackButton onPress={cancelNav}/>
        });
    },[navigation])
    return (
        <Container>
            <Content>
                <Formik
                    initialValues = {queryInitialValues}
                    validationSchema={querySchema}
                    onSubmit = {(values,actions) => {
                        Reactotron.log!(values);
                        createQuery(values).then(() => {
                            navigation.navigate(Screens.QUERY_VIEW,{name:"created Query"});
                        });
                        actions.resetForm();
                        
                    }}
                >
                    {(props) => <QueryForm formik={props}/>}
                </Formik>
            </Content>
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
        createQuery: bindActionCreators(writeQuery,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateQueryScreen);
