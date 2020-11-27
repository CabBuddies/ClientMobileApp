import React from 'react';
import { CForm }   from '../../components/organisms';
import {Container, Content, Toast } from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';
import { bindActionCreators } from 'redux';
import { signUp } from "../../redux/actions/auth-action"
import { connect } from 'react-redux';
import Reactotron from '../../../dev/ReactotronConfig';

function SignUpScreen({error,signUp}:any) {
    
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword:''
      }

    
    const signUpValidationSchema =  yup.object({
        firstname: yup.string().required("Firstname is required"),
        lastname: yup.string().required("Lastname is required"),
        email: yup.string().email("Invalid Email").required("Email is required"),
        password: yup.string().required("Password is required"),
        confirmPassword: yup.string().required("Confirm password please")
                        .oneOf([yup.ref('password'),""],"Passwords must match")
    })

    const showToast = (value:any) => {
    Toast.show({
        text: JSON.stringify(value),
        position: "bottom",
        duration: 3000
    })
    }
    const signupRoutine = (values:any,actions:any) =>{
        // showToast(values);
        actions.resetForm();
        signUp(values);
        if(error){
            Reactotron.error!(error,error);
            actions.setFieldError("server",error);
        }
    }

    return(
            <Container>
                <Content>
                <Formik 
                    initialValues = {initialValues}
                    validationSchema = {signUpValidationSchema}
                    onSubmit = {signupRoutine}
                >
                {(props) => (
                    <CForm formik = {props}/>
                )
                }
                </Formik>
                </Content>
            </Container>
    )
}

function mapStateToProps(state){
	const {authState} = state;
	return{
		isSignedIn:authState.isSignedIn,
		error: authState.error
	}
}

function mapDispatchToProps(dispatch) {
	return {
		signUp: bindActionCreators(signUp, dispatch),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen);
