import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Avatar, Button, Caption, Colors, Paragraph, Text, Title } from 'react-native-paper'
import { PlaceholderSize } from '../../definitions/common-definitions'
import { Screens } from '../../definitions/screen-definitions'
import RelationsTopTabNavigator from '../../navigations/RelationsNavigator'
import RelationButton from '../../screens/user-screens/RelationButton'
import ContentLoading from './ContentLoading'
import CustomAvatar from './CustomAvatar'
import * as UserRelationAPI from '../../api/user-relation-api';

export default function UserDetailsPreview({ user, isSelf, onEdit, isVerified, signOut=()=>{} }) {

    if (!user) {
        return <ContentLoading size={PlaceholderSize.MEDIUM} />
    }

    const name = user.firstName + ' ' + user.lastName;
    let followers = 0;
    let following = 0;

    const navigation = useNavigation();

    const [count,setCount] = React.useState({followersCount:0,followingCount:0});

    React.useEffect(()=>{
        UserRelationAPI.getAllRelations('accepted').then((result)=>{
            //setRelationList(result);
            let followersCount = result.filter((ur)=>ur.data.followeeId.userId===user.userId).length;
            let followingCount = result.length-followersCount;
            setCount({followersCount,followingCount});
        }).catch((error)=>{
            console.error(error);
            //reactotron.log!(error);
        })
    },[])

    return (
        <View>
            <View style={styles.avatar} >
                {<CustomAvatar data={user} size={100} />}
                <Title style={styles.title}>{name}</Title>
                <Caption>{user.email}</Caption>
                <RelationButton user={user} isSelf={isSelf} onEdit={onEdit} signOut={signOut} />
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(Screens.USER_RELATIONS, {screen: Screens.FOLLOWERS})
                    }}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                {count.followersCount}
                        </Paragraph>
                            <Caption style={styles.caption}>Followers</Caption>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(Screens.USER_RELATIONS, { screen: Screens.FOLLOWING })
                    }}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                {count.followingCount}
                        </Paragraph>
                            <Caption style={styles.caption}>Following</Caption>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {
        color: Colors.white
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
