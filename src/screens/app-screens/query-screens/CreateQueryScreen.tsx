import React from 'react';
import { Alert, View } from 'react-native';
import {Content, Container, Footer, Text } from "native-base";
import { CButton as Button } from "../../../components/atoms"
import { Formik } from "formik";
import * as yup from "yup";
import Reactotron from 'reactotron-react-native';
import { QueryForm } from '../../../components/organisms';
import { bindActionCreators } from 'redux';
import { writeQuery } from "../../../redux/actions/queryAction";
import { connect } from 'react-redux';
import { Screens } from '../../../definitions/screen-definitions';


const CreateQueryScreen = ({navigation, createQuery}) => {
    Reactotron.log!("exec entered CreateQueryScreen");
    const queryInitialValues = {
        title:"",
        tags: [],
        description:""
    }
const querySchema = yup.object({
    title: yup.string().required("A title is Required"),
    tags: yup.array().min(1).required("Tags are Required"),
    description: yup.string().required("description is required")
});

const cancelNav = () => {
    navigation.navigate(Screens.GUIDE_ME);
}

    return (
        <Container>
            <Content>
                <Formik
                    initialValues = {queryInitialValues}
                    validationSchema={querySchema}
                    onSubmit = {(values,actions) => {
                        Reactotron.log!(values);
                        createQuery(values);
                        actions.resetForm();
                    }}
                >
                    {(props) => <QueryForm formik={props}/>}
                </Formik>
            </Content>
        </Container>
    )
}
function mapDispatchToProps(dispatch){
    return {
        createQuery: bindActionCreators(writeQuery,dispatch)
    }
}
export default connect(null,mapDispatchToProps)(CreateQueryScreen);
