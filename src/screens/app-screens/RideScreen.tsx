import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { Container, Content } from "native-base";
import { Text, TextInput, Button, Colors, Title } from "react-native-paper";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { dh, dw } from "../../utils/rn-utils";
import { Grid, Row } from "react-native-easy-grid";
import BottomSheet, { BottomSheetFlatList, TouchableOpacity } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import GooglePlacesInput from '../../components/molecules/GooglePlacesInput';
import { Screens } from '../../definitions/screen-definitions';
import reactotron from '../../../dev/ReactotronConfig';
type PickerMode = "date" | "time" | "datetime" | "countdown" | undefined;
export default function RideScreen({ navigation }: { navigation?: any }) {
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

    const [showTo, setShowTo] = React.useState(true);

    const [renderMap, setRenderMap] = React.useState(true);

    type loc={lat:number|null,lng:number|null,raw:any};

    const INIT_CENTER_DELTA = {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const [centerLocation,setCenterLocation] = React.useState({
        latitude:  37.2857,
        longitude: -121.8278,
        ...INIT_CENTER_DELTA
    });

    const [fromLocation, setFromLocation] = React.useState<loc>({
        lat: null,
        lng: null,
        raw: {}
    });

    const [toLocation, setToLocation] = React.useState<loc>({
        lat: null,
        lng: null,
        raw: {}
    });

    // ....O..........C...........D.....

    const [polyData,setPolyData] = React.useState({
        show:false,
        gpsLocations:[
            { latitude: 37.8025259, longitude: -122.4351431 }
        ]
    });

    React.useEffect(()=>{
        if(fromLocation.lat||toLocation.lat){

        }else{
            if(location){
                setCenterLocation({
                    ...INIT_CENTER_DELTA,
                    longitude:location.coords.longitude,
                    latitude:location.coords.latitude
                })
            }
        }
    },[location,fromLocation,toLocation]);

    React.useEffect(() => {
        reactotron.log!(location,fromLocation,toLocation);

        let temp = JSON.parse(JSON.stringify(centerLocation));

        if(fromLocation.lat){
            if(toLocation.lat){
                temp.latitude = (fromLocation.lat!+toLocation.lat!)/2;
                temp.longitude = (fromLocation.lng!+toLocation.lng!)/2;

                temp.latitudeDelta = Math.abs(fromLocation.lat!-toLocation.lat!)*(15/8);
                temp.longitudeDelta = Math.abs(fromLocation.lng!-toLocation.lng!)*(15/8);
                setCenterLocation(temp)
            }else{
                temp.latitude = fromLocation.lat!;
                temp.longitude = fromLocation.lng!;
                setCenterLocation({...temp,...INIT_CENTER_DELTA})
            }
        }else{
            if(toLocation.lat){
                temp.latitude = toLocation.lat!;
                temp.longitude = toLocation.lng!;
                setCenterLocation({...temp,...INIT_CENTER_DELTA})
            }else{
                //none of the [from,to] are set yet
            }
        }

        if (fromLocation.lat && toLocation.lat) {
            setPolyData({
                show:true,
                gpsLocations:[
                    { latitude: fromLocation.lat!, longitude: fromLocation.lng! },
                    { latitude: toLocation.lat!, longitude: toLocation.lng! }
                ]
            });
        } else {
            setPolyData({show:false,gpsLocations:[]})
        }

    }, [fromLocation, toLocation]);

    return (
        <View>
            { renderMap && <MapView style={styles.mapStyle}
                provider="google"
                initialRegion={centerLocation}
                region={centerLocation}
                zoomControlEnabled
                showsMyLocationButton
                showsUserLocation followsUserLocation>
                {
                    fromLocation.lat && <Marker
                        coordinate={{
                            latitude: fromLocation.lat!,
                            longitude: fromLocation.lng!
                        }}
                    />
                }
                {
                    toLocation.lat && <Marker
                        coordinate={{
                            latitude: toLocation.lat!,
                            longitude: toLocation.lng!
                        }}
                    />
                }
                {
                    polyData.show && <Polyline
                        geodesic
                        coordinates={polyData.gpsLocations}
                        lineDashPattern={[500,500]}
                        
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={6}
                    />
                }
            </MapView>}

            <View style={styles.overlayContainer}>
                <View style={{ position: 'relative' }}>
                    <GooglePlacesInput placeholder="from"
                        onSuggestionsShowing={(suggestionsShowing: boolean) => {
                            setShowTo(!suggestionsShowing);
                        }}
                        onLocationChanged={(data) => {
                            setFromLocation(data);
                        }}
                        elevation={10000}
                    />
                    <GooglePlacesInput placeholder="to" elevation={5} hide={!showTo} allSet={() => {
                        //navigation.navigate(Screens.GROUPS_SCREEN);
                    }} top={70}
                        onLocationChanged={(data) => {
                            setToLocation(data);
                        }} />
                </View>


                {/* <Button onPress={()=>{setRenderMap(true)}}>Show Map</Button> */}

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