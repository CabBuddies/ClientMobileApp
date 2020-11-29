import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Avatar, Button, Caption, Colors, Text, Title } from 'react-native-paper'
import { PlaceholderSize } from '../../definitions/common-definitions'
import { Screens } from '../../definitions/screen-definitions'
import RelationsTopTabNavigator from '../../navigations/RelationsNavigator'
import RelationButton from '../../screens/user-screens/RelationButton'
import ContentLoading from './ContentLoading'
import CustomAvatar from './CustomAvatar'

export default function UserDetailsPreview({ user, isSelf, onEdit, isVerified }) {

    if (!user) {
        return <ContentLoading size={PlaceholderSize.MEDIUM} />
    }

    const name = user.firstName + ' ' + user.lastName;
    let followers = 0;
    let following = 0;

    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.avatar} >
                {<CustomAvatar data={user} size={100} />}
                <Title>{name}</Title>
                <Caption>{user.email}</Caption>
                <Text onPress={() => {
                    navigation.navigate(Screens.USER_RELATIONS)
                }}>{ following } Following  { followers } Followers</Text>
                <RelationButton user={user} isSelf={isSelf} onEdit={onEdit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {
        color: Colors.white
    }
});
