import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper';
import { UserDetailsPreview } from '../../components/molecules'

/**
 * (Bottom sheet || Modal Screen) to show the view of a user
 */
export default function TBUserScreen({user}) {
    return (
        <View>
            <UserDetailsPreview user={user.data} />
            <Button>Follow</Button>
        </View>
    );
}
