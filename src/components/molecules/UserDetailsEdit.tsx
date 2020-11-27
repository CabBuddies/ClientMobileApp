import { Formik } from 'formik'
import { Form, Icon } from 'native-base'
import React, { useRef } from 'react'
import { Alert, View } from 'react-native'
import { Button, HelperText } from 'react-native-paper'
import { FormField } from '../atoms'
import { ImagePicker } from '../organisms'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import reactotron from 'reactotron-react-native'

export default function UserDetailsEdit({ formik }) {

    const imageRef = useRef<string>(null);

    const imageCB = (image: string) => {
        formik.values.displayPicture = image;
    }

    return (
        <View>
            <Form>
                <Button
                    mode="text"
                    uppercase={false}
                    onPress={() => {
                        reactotron.log!(`imageRef.current: `, imageRef.current);
                    }}>
                    <ImagePicker props={{ title: "Select Avatar", icon: "image" }} imageCB={imageCB} />
                </Button>
                <FormField
                    label="First Name"
                    itemProps={{ floatingLabel: true }}
                    value={formik.values.firstName}
                    changeHandler={formik.handleChange('firstName')}
                />
                <HelperText type="error" visible={formik.errors.firstName}>{formik.errors.firstName}</HelperText>
                <FormField
                    label="Last Name"
                    itemProps={{ floatingLabel: true }}
                    value={formik.values.lastName}
                    changeHandler={formik.handleChange('lastName')}
                />
                <HelperText type="error" visible={formik.errors.lastName}>{formik.errors.lastName}</HelperText>
                <TouchableOpacity onPress={formik.handleSubmit} style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }} >
                    <Button
                        mode="contained"
                        style={{ width: 200 }}
                    >
                        Save Details
                    </Button>
                </TouchableOpacity>
            </Form>
        </View>
    )
}