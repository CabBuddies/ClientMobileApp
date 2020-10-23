import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { CForm }   from '../../components/organisms';
import {Container, Content, Toast } from 'native-base';
import { Formik } from 'formik';
import { AuthContext } from "../../navigations/AuthContext";
import * as yup from 'yup';
export default function SignUpScreen() {
    
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword:''
      }

    const { signUp } = useContext(AuthContext);
    
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
        signUp(values).then( (val:any) => {
            console.log("login successful",val);
        }).catch((err:any) => {
            console.log("signup failed with",err.message);
            actions.setFieldError("server",err.message);
        });
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