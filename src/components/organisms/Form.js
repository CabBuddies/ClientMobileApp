import React from 'react'
import { StyleSheet,View, Alert } from 'react-native'
import { CButton as Button, FormField } from '../atoms'
import { InputField }  from '../atoms'
import { Form, Text } from 'native-base';
import { Grid, Col, Row} from 'react-native-easy-grid';

export default function CustomForm({type,formik}) {
    const exp = (type === "login")?
        (
            <Form style = {{flex:1}}>
              <FormField
              hasIcon label="Email"
              itemProps = {{floatingLabel:true, error:(formik.errors.email)?true:false}}
              icon = "ios-mail" iconStyle = {{color:"purple"}}
              changeHandler = {formik.handleChange('email')}
              blurHandler = {formik.handleBlur('email')}
              value = {formik.values.email}
              />
              {
                formik.errors.email && <Text style = {{marginLeft:10,fontSize:20,color:"red"}}>{formik.errors.email}</Text>
              }
          
            <FormField
              hasIcon label="Password"
              itemProps = {{floatingLabel:true,error:(formik.errors.password)?true:false}}
              inputProps = {{secureTextEntry:true}}
              icon = "ios-lock" iconStyle = {{color:"purple"}}
              changeHandler = {formik.handleChange('password')}
              blurHandler = {formik.handleBlur('password')}
              value = {formik.values.password}
              />
              {
                formik.errors.password && <Text style = {{marginLeft:10,fontSize:20,color:"red"}}>{formik.errors.password}</Text>
              }
              <Button rounded primary hasText
              onPress= {formik.handleSubmit}
              style = {styles.btn}
              title = "Sign In"
              />
            </Form>
        )
    :
       ( 
         
          <Form style = {{flex:1}}>
            <FormField
              hasIcon label="First Name"
              itemProps = {{floatingLabel:true}}
              icon = "md-person" iconStyle = {{color:"purple"}}
              changeHandler = {formik.handleChange('firstname')}
              blurHandler = {formik.handleBlur('firstname')}
              value = {formik.values.firstname}
              />

            <FormField
              hasIcon label="Last Name"
              itemProps = {{floatingLabel:true}}
              icon = "md-person" iconStyle = {{color:"purple"}}
              changeHandler = {formik.handleChange('lastname')}
              blurHandler = {formik.handleBlur('lastname')}
              value = {formik.values.lastname}
            />
          
            <FormField
              hasIcon label="Email"
              itemProps = {{floatingLabel:true}}
              icon = "ios-mail" iconStyle = {{color:"purple"}}
              changeHandler = {formik.handleChange('email')}
              blurHandler = {formik.handleBlur('email')}
              value = {formik.values.email}
            />
          
          <FormField
              hasIcon label="Password"
              itemProps = {{floatingLabel:true}}
              inputProps = {{secureTextEntry:true}}
              icon = "ios-lock" iconStyle = {{color:"purple"}}
              changeHandler = {formik.handleChange('password')}
              blurHandler = {formik.handleBlur('password')}
              value = {formik.values.password}
              />
          
            <FormField
              hasIcon label="Confirm Password"
              itemProps = {{floatingLabel:true}}
              inputProps = {{secureTextEntry:true}}
              icon = "ios-lock" iconStyle = {{color:"purple"}}
              changeHandler = {formik.handleChange('confirmPassword')}
              blurHandler = {formik.handleBlur('confirmPassword')}
              value = {formik.values.confirmPassword}
            />

          <Button rounded hasText primary
          onPress= {formik.handleSubmit}
          style = {styles.btn}
          title = "Sign Up"
          />
        </Form>
        )
            
        return exp
}

const styles = StyleSheet.create({
    btn:
    {
      marginTop: 20,
    },
    btnContainer:
    {
      flex:1,
      paddingVertical: 10,
      paddingHorizontal:24
    }

})

