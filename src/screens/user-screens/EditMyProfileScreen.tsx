import BottomSheet from '@gorhom/bottom-sheet'
import { Formik } from 'formik';
import { View, Text } from 'native-base';
import React, { useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import UserDetailsEdit from '../../components/molecules/UserDetailsEdit';
import * as yup from 'yup';
import { Alert } from 'react-native';

/**
 * This is a redundant file. Ignore this.
 */

export default function EditMyProfileScreen({ user }) {

    const renderSheetHeader = () => {
        return (
            <View style={styles.sheetHeader}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                </View>
            </View>
        )
    }

    const editProfileRef = useRef<any>();
    const snapPoints = useMemo(() => [0, '25%', '50%', '75%'], []);

    const { firstName, lastName, displayPicture } = useMemo(() => user, [user]);
    const userEditValidationSchema = yup.object({
        firstname: yup.string().required('Firstname is required'),
        lastname: yup.string().required('Lastname is required')
    })
    const saveUserDetails = () => {
        Alert.alert(`saving user details`)
    }
    return (
        <>
            <BottomSheet
                ref={editProfileRef}
                snapPoints={snapPoints}
                initialSnapIndex={-1}
                backgroundComponent={() => <View style={styles.bottomSheetBack}></View>}
                handleComponent={renderSheetHeader}
            >
                <View style={{ backgroundColor: Colors.white, height: '100%' }}>
                    <Formik
                        initialValues={{ firstName, lastName, displayPicture }}
                        validationSchema={userEditValidationSchema}
                        onSubmit={saveUserDetails}
                    >
                        {
                            (props) => (
                                <UserDetailsEdit formik={props} />
                            )
                        }
                    </Formik>
                </View>
            </BottomSheet>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
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
