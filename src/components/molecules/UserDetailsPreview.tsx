import { Content } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Avatar, Caption, Colors, Text } from 'react-native-paper'
import { PlaceholderSize } from '../../definitions/common-definitions'
import ContentLoading from './ContentLoading'
import CustomAvatar from './CustomAvatar'

export default function UserDetailsPreview({ user }) {

    if (!user) {
        return <ContentLoading size={PlaceholderSize.MEDIUM} />
    }

    const name = user.firstName + ' ' + user.lastName;

    return (
        <View>
            <View style={styles.avatar} >
                {<CustomAvatar data={user} size={100} />}
                <Text>{name}</Text>
                <Caption>{user.email}</Caption>
            </View>
            {(!user.email) && <Text>Please consider signing in to take advantage of all the features</Text>}
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
