import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { CForm }   from '../../components/organisms';
import {Container, Content, Toast } from 'native-base';
import { Formik } from 'formik';
import { AuthContext } from "../../navigations/RootNavigator"
export default function SignUpScreen() {
    
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword:''
      }

    const { signUp } = useContext(AuthContext);

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
                        signUp(values);
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