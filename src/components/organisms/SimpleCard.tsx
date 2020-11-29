import { IUser, User } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { Alert, StyleSheet } from 'react-native';
import { Card, Button as PaperButton, TouchableRipple } from 'react-native-paper';
import { CustomAvatar } from '../molecules';

interface ISimpleCardProps {
    user?: User;
    title?: string;
    subTitle?: string;
    actionTitle?: string;
    action?: () => void;
    onPress?: () => void;
    avatarSize?: number;
}

const SimpleCard = ({
    user, title = "Full Name", subTitle = "subtitle",
    actionTitle = "action", action, avatarSize=24,
    onPress = () => Alert.alert('Card Pressed') }: ISimpleCardProps) => {
    let data;
    if (user) {
        data = user.data;
        console.log('data', data, 'title', title);
        title = data.firstName + ' ' + data.lastName;
        subTitle = data.email;
    }

    return (
        <TouchableRipple>
            <Card onPress={onPress} elevation={3}>
                <Card.Title
                    title={title}
                    subtitle={subTitle}
                    left={() => (data && <CustomAvatar size={avatarSize} data={data} />)}
                    right={() => ( action && <PaperButton onPress={action}>{actionTitle}</PaperButton> )}
                />
            </Card>
        </TouchableRipple>
    )


}

export default SimpleCard;

const styles = StyleSheet.create({})
