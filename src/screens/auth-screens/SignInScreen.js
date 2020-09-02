import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomButton } from '../../components/atoms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Form from '../../components/organisms'
// import SignInForm from '../../components/organisms/SignInForm'

export default function SignInScreen({ navigation }) {
    const nav = (nav) => {
        console.log('[Info] navigating to SignUp screen\n')
        navigation.navigate('SignUp')
    }
    return(
        <KeyboardAwareScrollView>
        <View style={styles.formContainer}>
            <Form type="login"/>
            <Text style = {{ paddingHorizontal: 24 }}>Don't have an account? </Text>
            <CustomButton 
                title="Sign Up"
                onPress={nav}
                style ={styles.btnContainer} 
                color = {styles.btnContainer.color}
            />
        </View>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create(
    {
        btnContainer:
        {
            paddingHorizontal: 24,
            paddingVertical:15,
            color: '#000'
        },
        formContainer:
        {
            flex:1,
            padding: 24,
            backgroundColor: '#fffa',
            justifyContent:'center',
            alignItems: 'stretch',
            alignContent: 'space-between'
        }

    }
)