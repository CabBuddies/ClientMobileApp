import React from 'react'
import { StyleSheet,View, Alert } from 'react-native'
import { CButton as Button } from '../atoms'
import { InputField }  from '../atoms'
import { Form, Item, Input, Icon, Label, Text } from 'native-base';
import { Grid, Col, Row} from 'react-native-easy-grid';

export default function CustomForm({type}) {
    const exp = (type === "login")?
        (
            <Form style = {{flex:1}}>
              <Item floatingLabel>
                <Icon name = "ios-mail"  />
                <Label>Email</Label>
                <Input />
              </Item>
            
              <Item floatingLabel>
                <Icon name = "key"/>
                <Label>Password</Label>
                <Input secureTextEntry/>
              </Item>
              
              <Button rounded primary hasText
              onPress= {() => {
                this.props.loginAction();
              }}
              style = {styles.btn}
              title = "Sign In"
              />
            </Form>
        )
    :
       ( 
        <Form style ={{flex:1}}>
        
          <Item floatingLabel>
          <Icon name="ios-text"/>
            <Label>First Name</Label>
            <Input />
          </Item>

          <Item floatingLabel>
            <Icon name="ios-text"/>
            <Label>Last Name</Label>
            <Input />
          </Item>
          
          <Item floatingLabel>
            <Icon name="ios-mail"/>
            <Label>Email</Label>
            <Input />
          </Item>
          
          <Item floatingLabel>
            <Icon name="key"/>
            <Label>Password</Label>
            <Input secureTextEntry/>
          </Item>
          
          <Item floatingLabel last>
            <Icon name="key"/>
            <Label>Confirm Password</Label>
            <Input secureTextEntry/>
          </Item>

          <Button rounded hasText primary
          onPress= {() => {
            Alert.alert(`Key Press`, `Sign Up`);
          }}
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

