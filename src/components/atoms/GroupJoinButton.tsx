import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import * as GroupUtils from '../../api/groups-api';

const GroupJoinButton = ({groupId,groupAuthorId,userId,isVerified}:{groupId:string,groupAuthorId:string,userId:string,isVerified:boolean}) => {
    
    const [state,setState] = React.useState(
        (groupAuthorId === userId)?'noactivity':
        (isVerified?'join':'noactivity')
    );

    React.useEffect(()=>{
        if(state!=='noactivity')
        GroupUtils.isGroupMember(groupId,userId).then((result)=>{
            if(!result)return;
            setState('leave');
        }).catch(()=>{

        })
    },[])

    const joinGroup = () => {
        GroupUtils.becomeGroupMember(groupId,userId).then((result)=>{
            if(result){
                setState(result.data.status==='accepted'?'leave':'noactivity');
            }
        }).catch((err)=>{

        })
    };
    const leaveGroup = () => {
        // TODO
        Alert.alert('Feature is yet to developed.');
    };

    const buttonMap ={
        'join':{
            show:true,
            positive:true,
            label:'Join',
            onClick:joinGroup
        },
        'leave':{
            show:true,
            positive:false,
            label:'Leave',
            onClick:leaveGroup
        },
        'noactivity':{
            show:false
        }
    }

    const buttonState = buttonMap[state];

    return (
        <View>
            {
                buttonState.show && <Button onPress={buttonState.onClick} mode={
                    buttonState.positive?'outlined':'contained'
                }>
                    {buttonState.label}
                </Button>
            }
        </View>
    )
}

export default GroupJoinButton

const styles = StyleSheet.create({})
