import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CButton as Button } from '../../components/atoms';
import { CForm, SocialLogin }  from '../../components/organisms'
import { Container, Content, Text, Thumbnail, Footer } from 'native-base'
import {Grid, Row, Col} from 'react-native-easy-grid'
import phi from '../../../assets/placeholderIcon.png'

export default function SignInScreen({ navigation }) {
    const nav = (nav) => {
        console.log('[Info] navigating to SignUp screen\n')
        navigation.navigate('SignUp')
    }
    return(
            <Container>
                <Content>   
                    <Grid style = {styles.container}>
                        <Row style={{ justifyContent:"center" }}>
                            <Thumbnail source={phi} style = {{ marginTop:20 }}/>
                        </Row>
                        <Row >
                            <SocialLogin/>
                        </Row>
                        <Row > 
                            <CForm type="login"/>
                        </Row>
                        <Row>  
                        <Button
                                hasText transparent
                                onPress = {nav}
                                title = " New to CabBuddies? SignUp "
                                container = {{flex:1, justifyContent:"center"}}
                            />
                        </Row>    
                    </Grid>
                </Content>
                <Footer style= {{backgroundColor:"#fff"}}>
                <Button
                    hasText transparent
                    onPress = {nav}
                    title = " Continue without signup "
                    container = {{flex:1, justifyContent:"center"}}
                />
                </Footer>
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