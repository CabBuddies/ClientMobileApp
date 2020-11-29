import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper';
import { UserDetailsPreview } from '../../components/molecules'
import RelationsTopTabNavigator from '../../navigations/RelationsNavigator';

/**
 * (Bottom sheet || Modal Screen) to show the view of a user
 */
export default function TBUserScreen({route, navigation}) {
    const user = route.params.user;
    const name = user.firstName+' '+user.lastName;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: name
        }) 
    }, [navigation])
    return (
        <View>
            <UserDetailsPreview user={user} />
            <Button>Follow</Button>
            <RelationsTopTabNavigator />
        </View>
    );
}
