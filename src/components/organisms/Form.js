import React from 'react'
import { StyleSheet,View, Alert } from 'react-native'
import { CustomButton as Button } from '../atoms'
import { InputField }  from '../atoms'

export default function Form(props) {
    const exp = (props.type === "login")?
        (<View style={styles.container}>
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
            <Button style = {styles.btnContainer} color="#000" title="Login" onPress={() => Alert.alert('Login pressed')} />

            
        </View>)
    :
       ( <View style = {styles.container}>
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
            <Button style = {styles.btnContainer} color="#000" title="Sign Up" onPress={() => Alert.alert('Register pressed')} /> 
        </View>
        )
            
        return exp
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        // flexDirection:"row",
        paddingVertical: 20,
        paddingHorizontal: 24,
        justifyContent:"space-around",
        alignItems: "stretch",
        alignContent:"stretch"
    },
    input:{
        borderColor:'#000',
        borderBottomWidth:1,
        fontSize: 18,
        borderRadius: 2,
        padding: 5,
        marginTop: 10,
    },
    btnContainer:
    {
      paddingVertical: 10, 
    }

})

