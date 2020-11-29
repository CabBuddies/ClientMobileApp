import { Group, IGroup } from 'node-rest-objects/dist/data/groups';
import { IUser, User } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { Alert, StyleSheet } from 'react-native';
import { Card, Button as PaperButton, TouchableRipple } from 'react-native-paper';
import { CustomAvatar } from '../molecules';

interface ISimpleCardProps {
    content?: User | Group;
    title?: string;
    subTitle?: string;
    actionTitle?: string;
    action?: () => void;
    onPress?: () => void;
    avatarSize?:number
}

const SimpleCard = ({
    content, title = "Full Name", subTitle = "subtitle",
    actionTitle = "action", action,
    onPress = () => Alert.alert('Card Pressed'), avatarSize=24 }: ISimpleCardProps) => {
    let data:IUser|IGroup;
    if (content instanceof User) {
        data = content.data;
        title = data.firstName + ' ' + data.lastName;
        subTitle = data.email;
    }
    else if (content instanceof Group){
        data = content.data
        title = data.title
        subTitle = data.description;
    }

    return (
        <TouchableRipple>
            <Card onPress={onPress} elevation={3}>
                <Card.Title
                    title={title}
                    subtitle={subTitle}
                    left={() => (data && <CustomAvatar size={avatarSize} data={data} />)}
                    right={() => (action && <PaperButton mode="contained" onPress={action}>{actionTitle}</PaperButton>)}
                />
            </Card>
        </TouchableRipple>
    )


}

export default SimpleCard;

const styles = StyleSheet.create({})
