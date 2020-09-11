import React from 'react'
import { StyleSheet,View, Alert } from 'react-native'
import { CButton as Button } from '../atoms'
import { InputField }  from '../atoms'
import { Form, Item, Input, Icon, Label, Text } from 'native-base';
import { Grid, Col, Row} from 'react-native-easy-grid';

export default function CustomForm(props) {
    const exp = (props.type === "login")?
        (
            <Form style = {{flex:1}}>
              <Item floatingLabel>
                <Icon name = "md-person"/>
                <Label>Email</Label>
                <Input />
              </Item>
            
              <Item floatingLabel>
                <Icon name = "key"/>
                <Label>Password</Label>
                <Input secureTextEntry/>
              </Item>
              
              <Button rounded primary hasText
              onPress= {() => Alert.alert('Sign in Pressed')}
              style = {styles.btn}
              title = "Sign In"
              />
            </Form>
        )
    :
       ( 
        <Form style ={{flex:1}}>
        
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input />
          </Item>

          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input />
          </Item>
          
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          
          <Item floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry/>
          </Item>
          
          <Item floatingLabel last>
            <Label>Confirm Password</Label>
            <Input secureTextEntry/>
          </Item>

          <Button rounded hasText primary
          onPress= {() => Alert.alert('Signup Pressed')}
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

