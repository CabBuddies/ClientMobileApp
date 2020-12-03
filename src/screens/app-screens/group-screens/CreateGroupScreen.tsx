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

type PickerMode = "date" | "time" | "datetime" | "countdown" | undefined;

const CreateGroupScreen = ({ route }) => {

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
                }}
            >
                {(props) => {
                    return <Form style={{ flex: 1, padding: 10 }}>


                        <PaperInput
                            style={styles.textStyle}
                            mode="flat"
                            label="Title"
                            value={props.values.title}
                            onChangeText={(text) => props.setFieldValue('title', text)}
                        />
                        <PaperInput
                            disabled
                            mode="outlined"
                            label="Starting from"
                            value={props.values.planOriginPlace.raw.address}
                        />
                        {/* <DateTimePicker
                            value={new Date(props.values.planOriginTime)}
                            mode={'datetime'}
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    reactotron.log!(date);
                                    props.setFieldValue('planOriginTime', date.getTime());
                                }
                            }}
                        /> */}
                        <MyDatePicker
                            label='Select starting time'
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
                            label='Select reach-by time'
                            defaultValue={new Date(props.values.planDestinationTime)}
                            onChange={(date) => {
                                props.setFieldValue('planDestinationTime', date);

                            }} />
                        <Button onPress={props.handleSubmit}>
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
    }

})
