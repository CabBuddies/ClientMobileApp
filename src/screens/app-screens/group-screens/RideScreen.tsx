import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Colors, Title } from "react-native-paper";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { dh, dw } from "../../../utils/rn-utils";
import { Grid, Row } from "react-native-easy-grid";
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import GooglePlacesInput from '../../../components/molecules/GooglePlacesInput';
import reactotron from '../../../../dev/ReactotronConfig';
import { showRidesNow, createTravelGroup } from '../../../utils/nav-utils';
import { loc } from '../../../definitions/ride-definitions';

export default function RideScreen({ navigation }: { navigation?: any }) {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
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

    const [showTo, setShowTo] = React.useState(true);

    const [renderMap, setRenderMap] = React.useState(true);

    const INIT_CENTER_DELTA = {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const [centerLocation, setCenterLocation] = React.useState({
        latitude: 37.2857,
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

    const [disable, setDisable] = useState(true);

    // React.useEffect(() => {
    //     if(fromLocation!==null && fromLocation!==undefined) {
    //         if(toLocation!==null && toLocation!==undefined) {
    //             setDisable(false);
    //         }
    //     }
    // }, [disable])

    // ....O..........C...........D.....

    const [polyData, setPolyData] = React.useState({
        show: false,
        gpsLocations: [
            { latitude: 37.8025259, longitude: -122.4351431 }
        ]
    });

    React.useEffect(() => {
        if (fromLocation.lat || toLocation.lat) {

        } else {
            if (location) {
                setCenterLocation({
                    ...INIT_CENTER_DELTA,
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                })
            }
        }
    }, [location, fromLocation, toLocation]);

    React.useEffect(() => {
        reactotron.log!(location, fromLocation, toLocation);

        let temp = JSON.parse(JSON.stringify(centerLocation));

        if (fromLocation.lat) {
            if (toLocation.lat) {
                temp.latitude = (fromLocation.lat! + toLocation.lat!) / 2;
                temp.longitude = (fromLocation.lng! + toLocation.lng!) / 2;

                temp.latitudeDelta = Math.abs(fromLocation.lat! - toLocation.lat!) * (15 / 8);
                temp.longitudeDelta = Math.abs(fromLocation.lng! - toLocation.lng!) * (15 / 8);
                setCenterLocation(temp)
            } else {
                temp.latitude = fromLocation.lat!;
                temp.longitude = fromLocation.lng!;
                setCenterLocation({ ...temp, ...INIT_CENTER_DELTA })
            }
        } else {
            if (toLocation.lat) {
                temp.latitude = toLocation.lat!;
                temp.longitude = toLocation.lng!;
                setCenterLocation({ ...temp, ...INIT_CENTER_DELTA })
            } else {
                //none of the [from,to] are set yet
            }
        }

        if (fromLocation.lat && toLocation.lat) {
            setPolyData({
                show: true,
                gpsLocations: [
                    { latitude: fromLocation.lat!, longitude: fromLocation.lng! },
                    { latitude: toLocation.lat!, longitude: toLocation.lng! }
                ]
            });
        } else {
            setPolyData({ show: false, gpsLocations: [] })
        }

        if (fromLocation !== null && fromLocation !== undefined) {
            if (toLocation !== null && toLocation !== undefined) {
                setDisable(false);
            }
        }

    }, [fromLocation, toLocation, disable]);

    return (
        <View style={{ flex: 1 }}>
            { renderMap && <MapView style={styles.mapStyle}
                provider="google"
                initialRegion={centerLocation}
                region={centerLocation}
                // zoomControlEnabled
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
                        lineDashPattern={[50, 25]}
                        lineCap="square"
                        strokeColor="rgba(0,0,55,0.7)" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={4}
                    />
                }
            </MapView>}

            <View style={styles.overlayContainer}>
                <View style={{ position: 'relative' }}>
                    {/* TODO - check if we can make them required. or else we have to handle many other cases */}
                    <GooglePlacesInput placeholder="from"
                        onSuggestionsShowing={(suggestionsShowing: boolean) => {
                            setShowTo(!suggestionsShowing);
                        }}
                        onLocationChanged={(data) => {
                            setFromLocation(data);
                        }}
                    // elevation={10000}
                    />
                    <GooglePlacesInput placeholder="to" elevation={5} hide={!showTo} allSet={() => {
                        //navigation.navigate(Screens.GROUPS_SCREEN);
                    }} top={70}
                        onLocationChanged={(data) => {
                            setToLocation(data);
                        }} />
                </View>

                {/* TODO - we have to disable the buttons until user enters from and to */}
                <Row style={styles.btnContainer}>
                    <Button mode="contained" disabled={disable} onPress={() => showRidesNow(navigation, fromLocation, toLocation)} color={Colors.green700} style={styles.button}>Find Rides</Button>
                    <Button mode="contained" disabled={disable} onPress={() => createTravelGroup(navigation, fromLocation, toLocation)} color={Colors.blue700} style={styles.button}>Plan Ride</Button>
                </Row>
            </View>
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
        top: dh() - dh(0.3),
        position: 'absolute',
        backgroundColor: 'rgba(25,255,23,0.005)',
        width: dw(),
    },
    overlayContainer: {
        // alignItems: "stretch",
        // alignContent: "space-between",
        backgroundColor: "transparent",
        width: dw() - 20,
        position: "absolute",
        marginTop: 20,
        paddingBottom: 10,
        flex: 1
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
    }
});