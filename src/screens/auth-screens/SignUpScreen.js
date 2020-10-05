import React from 'react';
import { View, Text } from 'react-native';
import { CForm }   from '../../components/organisms';
import {Container, Content, Toast } from 'native-base';
import { Formik } from 'formik';
export default function SignUpScreen() {
    
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword:''
      }

    const showToast = (value) => {
    Toast.show({
        text: JSON.stringify(value),
        position: "bottom",
        duration: 3000
    })
    }

    return(
            <Container>
                <Content>
                <Formik 
                    initialValues = {initialValues}
                    onSubmit = {(values,actions) =>{ 
                        showToast(values);
                        actions.resetForm();
                    }}
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