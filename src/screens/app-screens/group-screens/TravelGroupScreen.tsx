import React from 'react';
import { Text, View } from 'react-native';
import { ImagePicker } from '../../../components/organisms';
import { Button } from 'react-native-paper';

export default function TravelGroupScreen() {
    return (
        <View>
            <Text>Travel Groups Screen.</Text>
            <ImagePicker />
            <Button>Hello there</Button>
        </View>
    )
}
