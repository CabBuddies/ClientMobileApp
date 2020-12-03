import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native'
import { Content, Form } from 'native-base';
import { Formik } from 'formik';
import { IGroup } from 'node-rest-objects/dist/data/groups';

type PickerMode = "date" | "time" | "datetime" | "countdown" | undefined;

const CreateGroupScreen = ({ route }) => {

    // TODO - use these locations and let user plan a trip
    let fromLoc;
    let toLoc;
    if(route) {
        fromLoc = route.params.fromLocation;
        toLoc = route.params.toLocation;
    }

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<PickerMode>('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showPicker = () => {
        setShow(true);
        setMode('date');
    }

    const groupInitialValues = {
        title: "",
        description: "",
        plan: {
            origin: {
                
            },
            destination: {

            }
        }
    }

    return (
        <>
            {/* 
            * use to and from locs
            * ask dates
            * flexibility
            * 
            */}
            <Formik 
                initialValues={groupInitialValues}
                onSubmit = {() => {

                }}
            />
            {/* {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                />
            )} */}
        </>
    )
}

export default CreateGroupScreen

const styles = StyleSheet.create({})
