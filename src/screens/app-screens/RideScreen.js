import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header , Container, Content, Left, Body, Text, Segment, Title} from "native-base";


export default function RideScreen({ navigation }) {
    
    return(
        <Container>
            <Header>
                {/* <Body> */}
                    <Title>Find a Ride </Title>
                {/* </Body> */}
            </Header>
        </Container>

        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text> Ride Screen </Text>
        // </View>
    )
}