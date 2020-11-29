import React from 'react';
import { StyleSheet,View } from 'react-native';
import { Container, Content } from "native-base";
import { Text, TextInput } from "react-native-paper";
import MapView from 'react-native-maps';
import {dh,dw} from "../../utils/rn-utils";

export default function RideScreen({ navigation }) {
    
    return (
        <Container>
            
                <MapView style={styles.mapStyle} 
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                {/* <View style={{position:"absolute",bottom:50,backgroundColor:"white"}}> */}
                <View style={styles.overlayContainer}>
                    <TextInput style={{backgroundColor:"white",height:dh(0.1)}}/>
                    <Text style={{color:"black"}}>Just some text</Text>
                    <Text style={{color:"black"}}>Just some text</Text>
                    <Text style={{color:"black"}}>Just some text</Text>
                    <Text style={{color:"black"}}>Just some text</Text>
                </View>
           
        </Container>

        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text> Ride Screen </Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: dw(),
        height: dh(),
    },
    overlayContainer:{
        backgroundColor: 'transparent',
        width:dw()-20,
        position:"absolute",
        marginTop:20,
        marginHorizontal:10
    }
});
