import React from 'react'
import { StyleSheet, Button, KeyboardAvoidingView, Platform, View } from 'react-native'
import InputField from '../atoms/InputField'

export default function Form(props) {
    const exp = (props.type === "login")?
        (<View style={styles.container}
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
            <Button color="black" title="Login" onPress={() => console.log('Login pressed')} />

            
        </View>)
    :
       ( <View>
            <InputField
              style={styles.input}
              placeholder='First Name'
              autoCapitalize="none"
              placeholderTextColor = "#999"
            //   onChangeText={props.handleChange('title')}
            //   value={props.values.title}
            />

            <InputField
              style={styles.input}
              placeholder='Last name'
              autoCapitalize="none"
              placeholderTextColor = "#999"
            //   onChangeText={props.handleChange('body')}
            //   value={props.values.body}
            />

            <InputField
              style={styles.input}
              multiline
              placeholder='email'
              autoCapitalize="none"
              placeholderTextColor = "#999"
            //   onChangeText={props.handleChange('body')}
              keyboardType = "email-address"
            //   value={props.values.body}
            />

            <InputField 
              style={styles.input}
              placeholder='password'
              autoCapitalize="none"
              secureTextEntry
              placeholderTextColor = "#999"
            //   onChangeText={props.handleChange('rating')}
            //   value={props.values.rating}
              
            />

            <InputField 
              style={styles.input}
              placeholder='confirm password'
              autoCapitalize="none"
              secureTextEntry
              placeholderTextColor = "#999"
            //   onChangeText={props.handleChange('rating')}
            //   value={props.values.rating}
              
            />
            <Button color="black" title="Sign Up" onPress={() => console.log('Register pressed')} /> 
        </View>
        )
            
        return exp
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingVertical: 20,
        paddingHorizontal: 24,
        alignContent:"center"
    },
    input:{
        borderColor:'#000',
        borderWidth:2,
        fontSize: 24,
        borderRadius: 8
    }
})

