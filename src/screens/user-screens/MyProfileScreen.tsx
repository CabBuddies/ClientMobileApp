import React, { useEffect, useMemo, useLayoutEffect } from 'react';
import { Colors, Button, Text, Title } from 'react-native-paper';
import { Container } from "native-base";
import { IAppState } from '../../redux/initialState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, saveUser } from "../../redux/actions/user-action";
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import UserDetailsPreview from '../../components/molecules/UserDetailsPreview';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import UserDetailsEdit from '../../components/molecules/UserDetailsEdit';
import { Formik } from 'formik';
import * as yup from 'yup';
import RelationsTopTabNavigator from '../../navigations/RelationsNavigator';
import reactotron from '../../../dev/ReactotronConfig';
import { IUser, User } from 'node-rest-objects/dist/data/user-management';
import { Confirmation } from '../../components/organisms';

interface UserDetails {
    navigation: any;
    getUserDetails: any;
    user: User | undefined;
    loading?: boolean | undefined;
    updateUserDetails: any;
    isVerified: boolean | undefined;
    userProfile: IUser | undefined;
}

function MyProfileScreen({ getUserDetails, user, loading, updateUserDetails, isVerified, userProfile }: UserDetails) {

    useEffect(() => {
        getUserDetails()
    }, [])

    if (!user && userProfile) {
        user = new User();
        user.data = userProfile;
    }

    const editProfileRef = useRef<any>();
    const snapPoints = useMemo(() => [0, '45%', '85%', '100%'], []);
    const navigation = useNavigation();

    const renderSheetHeader = () => {
        return (
            <View style={styles.sheetHeader}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                </View>
            </View>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button mode="text" compact uppercase={false} onPress={() => {
                if (editProfileRef.current)
                    editProfileRef.current.snapTo(2);
            }}>Edit</Button>
        })
    });

    const userEditValidationSchema = yup.object({
        firstName: yup.string().required('Firstname is required'),
        lastName: yup.string().required('Lastname is required')
    })

    const saveUserDetails = (values) => {
        reactotron.log!(`SAVING USER DETAILS`, values);
        updateUserDetails(user, values);
    }

    let firstName = "";
    let lastName = "";
    let displayPicture = "";

    if (user?.data) {
        firstName = user.data.firstName;
        lastName = user.data.lastName;
        displayPicture = user.data.displayPicture;
    }


    return (
        <Container>
            <UserDetailsPreview user={user?.data} />
            {
                isVerified ?
                    <RelationsTopTabNavigator /> :
                    <Confirmation />
            }
            {
                user?.data
                &&
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
                            onSubmit={(values, actions) => {
                                saveUserDetails(values);
                                editProfileRef.current.close();
                                actions.resetForm();
                            }}
                        >
                            {
                                (props) => (
                                    <UserDetailsEdit formik={props} />
                                )
                            }
                        </Formik>
                    </View>
                </BottomSheet>
            }
        </Container>
    )

}

function mapStateToProps(state: IAppState) {
    const { userState } = state;
    const { isConfirmed, profile } = state.authState;
    return {
        user: userState.user,
        loading: userState.loading,
        error: userState.error,
        errorType: userState.errorType,
        isVerified: isConfirmed,
        userProfile: profile
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: bindActionCreators(getUser, dispatch),
        updateUserDetails: bindActionCreators(saveUser, dispatch)
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MyProfileScreen);

const styles = StyleSheet.create({
    avatar: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {
        color: Colors.white
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
    viewBasic: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});