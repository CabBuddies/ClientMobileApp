import React, { useState, useEffect } from 'react';
import { Dimensions,StyleSheet } from 'react-native';
import { Header , Container, Content, Left, Body, Text, Segment, Title} from "native-base";
import MapView from 'react-native-maps';


export default function RideScreen({ navigation }) {
    
    return(
        <Container>
            <Header>
                {/* <Body> */}
                    <Title>Find a Ride </Title>
                {/* </Body> */}
            </Header>
            <Content>
                <MapView style={styles.mapStyle}/>
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
