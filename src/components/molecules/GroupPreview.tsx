import { Icon } from 'native-base';
import { IGroup } from 'node-rest-objects/dist/data/groups';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Caption, Colors, Paragraph, Title } from 'react-native-paper'
import { showToast } from '../../utils/Helpers';
import CustomAvatar from './CustomAvatar';


interface IGroupPreviewProps{
    group:IGroup;
}
const GroupViewScreen = ({group}:IGroupPreviewProps) => {
    return (
        <View>
            <View style={styles.avatar} >
                {<CustomAvatar data={group} size={100} />}
                <Title style={styles.title}>{group.title}</Title>
                {group.description!=="" && <Caption>{group.description}</Caption>}
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => {
                        showToast("members pressed");
                    }}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                {group.stats.followCount || 0}
                        </Paragraph>
                            <Icon type="MaterialCommunityIcons" name="account-group" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default GroupViewScreen

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
        marginTop: 15,
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
})
