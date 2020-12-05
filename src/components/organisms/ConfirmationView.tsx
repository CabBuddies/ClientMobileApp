import { Formik } from 'formik';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Colors, IconButton, Text, TextInput as PaperInput, Title } from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { bindActionCreators } from 'redux';
import { confirmAccount, reqNewVerificationToken } from '../../api/auth-api';
import { connect } from 'react-redux';
import { getUser } from '../../redux/actions/user-action';

interface ConfirmationViewProps {
    verifyEmail?: any,
    getUserDetails?: any
}

const ConfirmationView = ({ verifyEmail, getUserDetails }: ConfirmationViewProps) => {

    const confirmationInitialValues = {
        confirmationCode: ''
    };

    const [sendConfirmation, setSendConfirmation] = useState(false);

    const resendConfirmation = () => {
        reqNewVerificationToken().then((resp) => {
            reactotron.log!(`response for resend confirmation: `, resp);
            setSendConfirmation(resp);

        }).catch(err => {
            reactotron.log!(err);
        })
    }

    return (
        <View>
            <Title>Verify Email</Title>
            <View style={{ margin: 20 }}>
                <Formik
                    initialValues={confirmationInitialValues}
                    onSubmit={(values, actions) => {
                        reactotron.log!(values);
                        verifyEmail(values.confirmationCode).then(() => {
                            // TODO: toast for confirmation
                            getUserDetails();
                        }).catch(err => {
                            reactotron.log!(`Error confirming account: `, err);
                        })
                    }}
                >
                    {
                        ({ values, setFieldValue, handleSubmit, isSubmitting }) => (
                                    <>
                                    <Title>Please Confirm Email</Title>
                                        <PaperInput
                                            label="enter confirmation code"
                                            value={values.confirmationCode}
                                            onChangeText={(text) => setFieldValue('confirmationCode', text)}
                                            mode='flat'
                                            multiline={false}
                                        />
                                        <Button icon="send"
                                            disabled={isSubmitting || values.confirmationCode === ""} color={Colors.blue700}
                                            onPress={handleSubmit}
                                        >Verify</Button>
                                        </>
                        )
                    }

                </Formik>
            </View>
            <View style={{ margin: 20 }}>
                <Button
                    mode="contained"
                    style={{ width: 200 }}
                    onPress={resendConfirmation}
                >
                    Resend Code
            </Button>
                {sendConfirmation && <View><Text>Confirmation sent to your email.</Text></View>}
            </View>
        </View>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        verifyEmail: bindActionCreators(confirmAccount, dispatch),
        getUserDetails: bindActionCreators(getUser, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ConfirmationView);
