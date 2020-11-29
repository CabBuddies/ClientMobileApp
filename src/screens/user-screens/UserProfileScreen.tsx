import { Container } from 'native-base';
import { IUser } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { useLayoutEffect } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import { IAppState } from '../../redux/initialState';
import UserProfileView from './UserProfileView';

const UserProfileScreen = ({route,userId,isAnonymous,isVerified, navigation}) => {
    //TODO
    let name = "User";
    let user:IUser;
    if (route && route.params && route.params.user) {
        user = route.params.user;
        name = user.firstName+' '+user.lastName;
        return (
            <Container>
                <UserProfileView userData={user} userId={userId} isSelf={false} isVerified={isVerified}/>
            </Container>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: name
        }) 
    }, [navigation])

    return (
        <Container>
           <Text style={{color:'red'}}>User is not available.</Text>
        </Container>
    )
}


function mapStateToProps(state: IAppState) {
    const { isConfirmed, userId,anonymous } = state.authState;
    return {
        isVerified: isConfirmed,
        userId: userId,
        isAnonymous:anonymous
    }
}
const connector = connect(mapStateToProps);
export default connector(UserProfileScreen);
