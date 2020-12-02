import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Container, Content } from "native-base";
import { Text, TextInput, Button, Colors, Title } from "react-native-paper";
import MapView, { Marker } from 'react-native-maps';
import { dh, dw } from "../../utils/rn-utils";
import { Grid, Row } from "react-native-easy-grid";
import BottomSheet, { BottomSheetFlatList, TouchableOpacity } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import GooglePlacesInput from '../../components/molecules/GooglePlacesInput';
import { Screens } from '../../definitions/screen-definitions';
type PickerMode = "date" | "time" | "datetime" | "countdown" | undefined;
export default function RideScreen({ navigation }:{navigation?:any}) {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<PickerMode>('date');
    const [show, setShow] = useState(false);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };
    const showPicker = () => {
        setShow(true);
        setMode('datetime');
    }

    //const [showTo,setShowTo] = React.useState(true);

    const [renderMap,setRenderMap]=React.useState(true);

    // React.useEffect(()=>{
    //     setTimeout(()=>{
    //         setRenderMap(true);
    //     },5000);
    // },[]);

    return (
        <View>
            { renderMap && <MapView style={styles.mapStyle}
                provider="google"
                initialRegion={{
                    latitude: 37.2857,
                    longitude: -121.8278,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} showsUserLocation followsUserLocation>
                <Marker
                    coordinate={{
                        latitude: 37.2857,
                        longitude: -121.8278
                    }}
                />
            </MapView> }

            <View style={styles.overlayContainer}>
                <GooglePlacesInput placeholder="from" 
                // onFocus={()=>{
                //     setShowTo(false);
                // }} onBlur={()=>{
                //     setShowTo(true);
                // }}
                />
                <GooglePlacesInput placeholder="to" allSet={()=>{
                    navigation.navigate(Screens.GROUPS_SCREEN);
                }}/>

                <Button onPress={()=>{setRenderMap(true)}}>Show Map</Button>

                {/* <Row style={styles.btnContainer}>
                        <Button mode="contained" color={Colors.green700} style={styles.button}>Now</Button>
                        <Button mode="contained" onPress={showPicker} color={Colors.blue700} style={styles.button}>Later</Button>
                    </Row> */}
                {/* <Title style={{color:"black",backgroundColor:"white"}}>Current Date:{date.toDateString()}</Title> */}
                {/* <Title style={{color:"black",backgroundColor:"white"}}>Current Location:{JSON.stringify(location?.coords)}</Title> */}
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    mapStyle: {
        width: dw(),
        height: dh(),
    },
    btnContainer: {
        justifyContent: "space-evenly",
        marginTop: 10
    },
    overlayContainer: {
        alignItems: "stretch",
        alignContent: "space-between",
        backgroundColor: "transparent",
        width: dw() - 20,
        position: "absolute",
        marginTop: 20,
        paddingBottom: 10,
        marginHorizontal: 10,
        // borderWidth:2,
        // borderColor:Colors.blue500,
        // elevation:1
    },
    button: {
        borderColor: Colors.green700,
        borderRadius: 20,
        elevation: 0
    },
    input: {
        backgroundColor: "white",
        height: dh(0.1),
        margin: 5
    },
    bottomSheetBack: {
        backgroundColor: Colors.white
    },
    sheetHeader: {
        backgroundColor: '#eeeeee',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
});