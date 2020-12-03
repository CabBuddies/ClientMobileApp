import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native'
import { Container, Content, Form } from 'native-base';
import { Formik } from 'formik';
import * as yup from "yup";
import { IGroup } from 'node-rest-objects/dist/data/groups';
import reactotron from 'reactotron-react-native';
import { Button, TextInput as PaperInput } from 'react-native-paper';
import MyDatePicker from '../../../components/atoms/MyDatePicker';
import * as GroupUtils from '../../../api/groups-api';
import { goToGroups } from '../../../utils/nav-utils';

type PickerMode = "date" | "time" | "datetime" | "countdown" | undefined;

const CreateGroupScreen = ({ route, navigation }) => {

    // TODO - use these locations and let user plan a trip
    let fromLoc;
    let toLoc;
    if (route) {
        fromLoc = route.params.fromLocation;
        toLoc = route.params.toLocation;
    }

    // const [date, setDate] = useState(new Date());
    // const [mode, setMode] = useState<PickerMode>('date');
    // const [show, setShow] = useState(false);

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(false);
    //     setDate(currentDate);
    // };

    // const showPicker = () => {
    //     setShow(true);
    //     setMode('date');
    // }

    const groupInitialValues = {
        title: "",
        planOriginTime: new Date().getTime(),
        planOriginPlace: fromLoc,
        planDestinationTime: new Date().getTime(),
        planDestinationPlace: toLoc,
    }

    return (
        <Container>
            <Formik
                initialValues={groupInitialValues}
                onSubmit={(values, actions) => {
                    reactotron.log!("submiting create group", values);
                    actions.resetForm();
                    const { planDestinationTime, planOriginPlace, title, planDestinationPlace, planOriginTime } = values;
                    GroupUtils.createGroup(title, new Date(planOriginTime), planOriginPlace, new Date(planDestinationTime), planDestinationPlace)
                        .then((result) => {
                            reactotron.log!(`creating group: `, result);
                            const groupData= {
                                title,
                                
                            }
                            goToGroups(navigation);
                        }).catch((err) => {
                            reactotron.log!(`error creating group: `, err);
                        });
                }}
            >
                {(props) => {
                    return <Form style={{ flex: 1, padding: 10 }}>


                        <PaperInput
                            style={[styles.textStyle, styles.inputField]}
                            mode="outlined"
                            label="Give a title to your trip"
                            multiline numberOfLines={3}
                            value={props.values.title}
                            onChangeText={(text) => props.setFieldValue('title', text)}
                        />
                        <PaperInput
                            style={styles.inputField}
                            disabled
                            mode="outlined"
                            label="Starting from"
                            value={props.values.planOriginPlace.raw.address}
                        />
                        <MyDatePicker
                            label='Start Time'
                            defaultValue={new Date(props.values.planOriginTime)}
                            onChange={(date) => {

                                props.setFieldValue('planOriginTime', date);

                            }} />
                        <PaperInput
                            disabled
                            mode="outlined"
                            label="Going to"
                            value={props.values.planDestinationPlace.raw.address}
                        />

                        <MyDatePicker
                            label='Arrival Time'
                            defaultValue={new Date(props.values.planDestinationTime)}
                            onChange={(date) => {
                                props.setFieldValue('planDestinationTime', date);
                            }}
                        />
                        <Button onPress={props.handleSubmit} mode="contained" style={styles.submit}>
                            Submit
                        </Button>
                    </Form>
                }}
            </Formik>
            {/* {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                />
            )} */}
        </Container>
    )
}

export default CreateGroupScreen

const styles = StyleSheet.create({
    btn:
    {
        marginTop: 20,
    },
    btnContainer:
    {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 24
    },
    txtContainer: {
        borderColor: "blue",
    },
    textStyle: {
        fontSize: 20,
        backgroundColor: "rgba(245,255,240,0.1)",
    },
    errorText: {
        fontSize: 18
    },
    inputField: {
        marginBottom: 10
    },
    dtp: {
        flex: 1,
        flexDirection: "row"
    },
    submit: {
        margin: 10
    }
})
