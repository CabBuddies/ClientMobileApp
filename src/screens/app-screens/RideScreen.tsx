import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Container, Content, Text } from "native-base";
import MapView from 'react-native-maps';


export default function RideScreen({ navigation }) {

    return (
        <Container>
            <Content>
                <MapView style={styles.mapStyle} />
                <Text ></Text>
            </Content>
        </Container>

        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text> Ride Screen </Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
