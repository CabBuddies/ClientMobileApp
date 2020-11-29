import { IUser, User } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { Alert, StyleSheet } from 'react-native';
import { Card, Button as PaperButton } from 'react-native-paper';
import { CustomAvatar } from '../molecules';

interface ISimpleCardProps {
    user?: User;
    title?: string;
    subTitle?: string;
    actionTitle?: string;
    action?: () => void;
    onPress?: () => void;
}

const SimpleCard = ({ 
    user, title = "Full Name", subTitle = "subtitle", 
    actionTitle = "action", action = () => Alert.alert(`action triggered`),
    onPress=()=>Alert.alert('Card Pressed') }: ISimpleCardProps) => {
    let data;
    if (user) {
        data = user.data;
        console.log('data', data, 'title', title);
        title = data.firstName + ' ' + data.lastName;
        subTitle = data.userId;
    }

    return (
        <Card onPress={onPress} elevation={5}>
            <Card.Title
                title={title}
                subtitle={subTitle}
                left={() => (data && <CustomAvatar size={24} data={data} />)}
                right={() => <PaperButton onPress={action}>{actionTitle}</PaperButton>}
            />
        </Card>
    )


}

export default SimpleCard;

const styles = StyleSheet.create({})
