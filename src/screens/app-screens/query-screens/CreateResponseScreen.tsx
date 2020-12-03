import { Formik } from 'formik';
import { IQuery } from 'node-rest-objects/dist/data/queries';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {TextInput, Button as PaperButton, Text} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as yup from "yup";
import reactotron from '../../../../dev/ReactotronConfig';
import { writeResponse } from '../../../redux/actions/query-actions';
import { IAppState } from '../../../redux/initialState';

interface CResponseProps{
    query:RESTObject<IQuery>;
    newResponse:any
}
const CreateResponseScreen = ({query,newResponse}:CResponseProps) => {

    const responseInitialValues = {
        title:"",
        tags: ["RESPONSE"],
        body:""
    }
    const responseSchema = yup.object({
        // title: yup.string().required("A title is Required"),
        body: yup.string().required("description is required")
    });
    return (
        <View>
                <Formik
                        initialValues = {responseInitialValues}
                        validationSchema={responseSchema}
                        onSubmit = {(values,actions) => {
                            reactotron.log!(values);
                            newResponse(query,values).then(() => {
                            });
                            actions.resetForm();
                        }}
                    >
                        {(props) =>  (
                        <>
                        <TextInput onChangeText={(text) => props.setFieldValue('body',text) } multiline placeholder="enter your response here" mode="flat"/>
                        <PaperButton disabled={props.values.title!==""} mode="text" onPress={props.handleSubmit} compact={true}>Post</PaperButton>
                        </>
                        )
                         }
                </Formik>
            
        </View>
    )
}

function mapStateToProps(state:IAppState){
    const { queryState } =  state;
    return {
        query:queryState.query
    }
}

function mapDispatchToProps(dispatch){
    return {
        newResponse: bindActionCreators(writeResponse,dispatch),
    }
}

export default connect(null,mapDispatchToProps)(CreateResponseScreen);

const styles = StyleSheet.create({})
