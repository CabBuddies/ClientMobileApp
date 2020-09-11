import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CButton as Button } from '../../components/atoms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CForm, SocialLogin }  from '../../components/organisms'
import { Container, Content, Header, Left, Text, Title } from 'native-base'
import {Grid, Row, Col} from 'react-native-easy-grid'

export default function SignInScreen({ navigation }) {
    const nav = (nav) => {
        console.log('[Info] navigating to SignUp screen\n')
        navigation.navigate('SignUp')
    }
    return(
        
            <Container>
            
                <Content>
                    <KeyboardAwareScrollView>
                    <Grid style = {styles.container}>
                        <Row >
                            <SocialLogin/>
                        </Row>
                        <Row > 
                            <CForm type="login"/>
                        </Row>
                        <Row >
                            <Col style = {{alignItems:"center"}}>
                                <Text>New to CabBuddies?</Text>
                            </Col>
                            <Col style = {{alignItems:"flex-start", alignContent:"flex-start"}}>
                            <Button
                                    hasText transparent
                                    onPress = {nav}
                                    title = " Sign up here "
                                    container = {{flex:1, justifyContent:"center"}}
                                />
                            </Col>
                        </Row>
                        
                    </Grid>
                    </KeyboardAwareScrollView>
                </Content>
            </Container>
        
    )
}
const styles = StyleSheet.create(
    {
        btnContainer:
        {
            marginTop: 20, 
        },
        formContainer:
        {
            flex:1,
            padding: 24,
            // backgroundColor: '#fffa',
            justifyContent:'center',
            alignItems: 'stretch',
            alignContent: 'space-between'
        },
        row:
        {
            borderWidth: 2,
            borderTopColor: "#99f"
        },
        col:
        {
            borderLeftWidth: 2,
            borderLeftColor: "#99f"
        },

    }
)