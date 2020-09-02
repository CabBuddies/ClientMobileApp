import React from 'react'
import { StyleSheet, Button, KeyboardAvoidingView, Platform } from 'react-native'
import InputField from '../atoms/InputField'

export default function Form(props) {
    const exp = (props.type === "login")?
        (<KeyboardAvoidingView style={styles.container}
        behavior = {Platform.OS == "ios" ? "padding" : "height"}
        >
        <InputField
              style={styles.input}
              multiline
              placeholder='email'
              autoCapitalize="none"
            //   onChangeText={props.handleChange('body')}
              keyboardType = "email-address"
            //   value={props.values.body}
            />

            <InputField 
              style={styles.input}
              placeholder='password'
              autoCapitalize="none"
              secureTextEntry
            //   onChangeText={props.handleChange('rating')}
            //   value={props.values.rating}
              
            />
            <Button color="purple" title="Login" onPress={() => console.log('Login pressed')} />
        </KeyboardAvoidingView>)
    :
       ( <KeyboardAvoidingView 
            style={styles.container}
            behavior = {Platform.OS == "ios" ? "padding" : "height"}
         >
            
            <InputField
              style={styles.input}
              placeholder='First Name'
              autoCapitalize="none"
            //   onChangeText={props.handleChange('title')}
            //   value={props.values.title}
            />

            <InputField
              style={styles.input}
              placeholder='Last name'
              autoCapitalize="none"
            //   onChangeText={props.handleChange('body')}
            //   value={props.values.body}
            />

            <InputField
              style={styles.input}
              multiline
              placeholder='email'
              autoCapitalize="none"
            //   onChangeText={props.handleChange('body')}
              keyboardType = "email-address"
            //   value={props.values.body}
            />

            <InputField 
              style={styles.input}
              placeholder='password'
              autoCapitalize="none"
              secureTextEntry
            //   onChangeText={props.handleChange('rating')}
            //   value={props.values.rating}
              
            />

            <InputField 
              style={styles.input}
              placeholder='confirm password'
              autoCapitalize="none"
              secureTextEntry
            //   onChangeText={props.handleChange('rating')}
            //   value={props.values.rating}
              
            />
            <Button color="purple" title="Sign Up" onPress={() => console.log('Register pressed')} /> 
        </KeyboardAvoidingView>
        )
            
        return exp
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingVertical: 20,
        paddingHorizontal: 24
    },
    input:{
        borderColor:'purple',
        borderWidth:1,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    }
})

