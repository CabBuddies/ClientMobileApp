import { IUser } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { Alert, StyleSheet } from 'react-native';
import { Card, Button as PaperButton } from 'react-native-paper';
import { CustomAvatar } from '../molecules';

interface ISimpleCardProps{
    data?:IUser
    title?:string;
    subTitle?:string;
    actionTitle?:string;
    action?:() => void
}

const SimpleCard = ({data,title="Full Name",subTitle="subtitle",actionTitle="action",action=() => Alert.alert(`action triggered`)}:ISimpleCardProps) => {
    
    if(data){
        title=data.firstName+' '+data.lastName;
        subTitle = data.userId;
        actionTitle="Follow",
        action=() => Alert.alert(`Follow action pressed`);
    }
    
    return (
        <Card>
                <Card.Title 
                title={title}
                subtitle={subTitle}
                left={() => (data && <CustomAvatar size={24} data={data}/>)}
                right={() => <PaperButton onPress={action}>{actionTitle}</PaperButton>}
                />
        </Card>
    )
     
    
}

export default SimpleCard;

const styles = StyleSheet.create({})
