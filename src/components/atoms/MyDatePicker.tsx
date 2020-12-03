import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native'
import { Modal, Button, Portal } from 'react-native-paper';
import reactotron from '../../../dev/ReactotronConfig';

const MyDatePicker = ({ defaultValue = new Date(), onChange = (date) => { }, label = 'DateTimePicker' }: { defaultValue?: Date, onChange?(date: Date): void, label?: string }) => {
    //<ImageSelectionContainer defaultValue={formik.values.media} onChange={(values) => {formik.setFieldValue('media',values)} }/>
    const [showDTP, setShowDTP] = React.useState(false);
    const [date,setDate] = React.useState(defaultValue);
    return (
        <View>
            <Portal>
                <Modal contentContainerStyle={{backgroundColor:'white'}} visible={showDTP} onDismiss={() => { setShowDTP(false); }}>
                    <DateTimePicker
                        value={date}
                        mode={'datetime'}
                        display="default"
                        onChange={(event, date) => {
                            if (date){
                                reactotron.log!(date);
                                setDate(date);
                            }
                        }}
                    />
                    <Button onPress={()=>{setShowDTP(false)}}>
                        Cancel
                    </Button>
                    <Button onPress={()=>{onChange(date);setShowDTP(false)}}>
                        Select
                    </Button>
                </Modal>
            </Portal>
            <Text>{label}</Text>
            <Button onPress={() => {
                setShowDTP(!showDTP);
            }}>
                {defaultValue.toLocaleString()}
            </Button>
        </View>
    )
}

export default MyDatePicker

const styles = StyleSheet.create({})
