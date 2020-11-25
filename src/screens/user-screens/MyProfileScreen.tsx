import React, { useEffect } from 'react';
import { Avatar, Colors, Title, Text, Subheading, Caption, DataTable, TextInput } from 'react-native-paper';
import { Container, Content } from "native-base";
import { IAppState, IProfileState } from '../../redux/initialState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from "../../redux/actions/user-action";
import { StyleSheet, View } from 'react-native';

interface UserDetails {
    navigation: any;
    getUserDetails: any;
    user: IProfileState;
}

function MyProfileScreen({ navigation, getUserDetails, user }: UserDetails) {
    useEffect(() => {
        getUserDetails()
    }, [])

    const name = user.firstName + ' ' + user.lastName;

    const renderAvatar = () => {
        if (user?.displayPicture) {
            const uri = user?.displayPicture;
            return <Avatar.Image source={{ uri: uri }} />
        }
        else {
            const text = user?.firstName.charAt(0) + user?.lastName.charAt(0);
            return <Avatar.Text size={100} style={{ backgroundColor: Colors.blueA700 }} label={text} />
        }
    }

    return (
        <Container>
            <Content style={{ flex: 1 }} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.avatar} >
                    {renderAvatar()}
                    <Caption>{name}</Caption>
                </View>
                <DataTable style={{ justifyContent: "center" }}>
                    <DataTable.Row>
                        <DataTable.Cell>
                            <Title>First Name</Title>
                        </DataTable.Cell>
                        <DataTable.Cell>
                            <Subheading>{user.firstName}</Subheading>
                        </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>
                            <Title>Last Name</Title>
                        </DataTable.Cell>
                        <DataTable.Cell>
                            <Subheading>{user.lastName}</Subheading>
                        </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>
                            <Title>Email</Title>
                        </DataTable.Cell>
                        <DataTable.Cell>
                            <Text>{user.email}</Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                {(!user.email) && <Text>Please consider signing in to take advantage of all the features</Text>}
            </Content>
        </Container>
    )

}

function mapStateToProps(state: IAppState) {
    const { userState } = state;
    return {
        user: userState.profileState,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getUserDetails: bindActionCreators(getUser, dispatch)
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MyProfileScreen);

const styles = StyleSheet.create({
    avatar: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})