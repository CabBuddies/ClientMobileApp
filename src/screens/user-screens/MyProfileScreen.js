import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Header , Container, Content, Left, Body, Text, Segment, Title} from "native-base";
import { CButton as Button } from "../../components/atoms";
import { JSONPrint } from "../../utils";
import { User } from "node-rest-objects/src/data/user-management/user";

export default function MyProfileScreen({ navigation }) {
    const [details, setDetails] = useState({});
    const [name,setName] = useState('username');

    const getUser = () => {
        const user = new User();
        user.getMe().then(() => {
            setDetails(user.data);
            console.log("user:",user);
        }).catch((err) => {
            console.log("error getting user details",err);
        });
        
    }
    useEffect(() => {
        getUser()
    },[])
    useEffect(() => {
        setName(`${details.firstName} ${details.lastName}`);
    },[details]);
    
    
    // {/* <View style={{ flex: 1}}>
    //        <JSONPrint data = {details} />
    //    </View> */}
    
    return(
        <Container>
            <Header style = {{backgroundColor:"#3F51B5"}}>
                <Left>
                    <Button transparent
                        title="App"
                        onPress = {() => navigation.navigate("App",{screen:"GuideMe"})}
                        textStyle = {{fontSize:15, color:"#fff"}}
                        container = {{flex:0, margin:0}}
                        style = {{margin:0}}
                        
                        hasIcon icon = "arrow-back"
                        iconStyle = {{fontSize:20}}
                    />
                </Left>
                <Body>
                    <Title>{(name.split(' ')[0]!=="undefined")?name:"Anonymous"}</Title>
                </Body>
            </Header>
            <Content style={{flex:1}} contentContainerStyle={{justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30}}>Hello! {(name.split(' ')[0]!=="undefined")?name:"anonymous user"}</Text>
                <Segment>
                    <Text>email:</Text>
                    <Text>{(details.email)?details.email:"no mail"}</Text>
                </Segment>
                {(!details.email) && <Text>Please consider signing in to take advantage of all the features</Text>}
            </Content>
        </Container>

        
    )
    
}