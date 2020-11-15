import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Header , Container, Content, Left, Body, Text, Segment, Title} from "native-base";
import { CButton as Button } from "../../components/atoms";
import { JSONPrint } from "../../utils";
import { User } from "node-rest-objects/dist/data/user-management";
import Reactotron from "../../../dev/ReactotronConfig";
import { Screens } from '../../definitions/screen-definitions';
import { IAppState, IProfileState } from '../../redux/initialState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUser} from "../../redux/actions/user-action";

interface UserDetails{
    navigation:any;
    getUserDetails:any;
    user:IProfileState;
}
function MyProfileScreen({ navigation,getUserDetails,user }:UserDetails) {
    // const [details, setDetails]= useState<any>({});
    // const [name,setName] = useState('username');

    // const getUser = () => {
    //     const user = new User();
    //     user.getMe().then(() => {
    //         setDetails(user.data);
    //         Reactotron.log!("user:",user);
    //     }).catch((err) => {
    //         Reactotron.log!("error getting user details",err);
    //     });
        
    // }
    useEffect(() => {
        getUserDetails()
    },[])
    
    const name = user.firstName+' '+user.lastName;
    // {/* <View style={{ flex: 1}}>
    //        <JSONPrint data = {details} />
    //    </View> */}
    
    return(
        <Container>
            <Header style = {{backgroundColor:"#3F51B5"}}>
                <Left>
                    <Button transparent
                        title={Screens.APP}
                        onPress = {() => navigation.navigate(Screens.APP,{screen:Screens.GUIDE_ME})}
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
                    <Text>{(user.email)?user.email:"no mail"}</Text>
                </Segment>
                {(!user.email) && <Text>Please consider signing in to take advantage of all the features</Text>}
            </Content>
        </Container>

        
    )
    
}
function mapStateToProps(state:IAppState){
    const { userState } = state;
    return {
        user: userState.profileState,
    }
}
function mapDispatchToProps(dispatch){
    return {
        getUserDetails : bindActionCreators(getUser,dispatch) 
    }
}
const connector = connect(mapStateToProps,mapDispatchToProps);
export default connector(MyProfileScreen);