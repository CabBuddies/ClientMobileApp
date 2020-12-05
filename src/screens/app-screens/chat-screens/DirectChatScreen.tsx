import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, LogBox, Button } from 'react-native'
//import RealtimeDatabase from 'node-rest-objects/dist/rest/realtime.database'
import { IAppState } from '../../../redux/initialState'
import { connect } from 'react-redux'
import reactotron from '../../../../dev/ReactotronConfig'
import { IUser } from 'node-rest-objects/dist/data/user-management'

import * as NROMessage from 'node-rest-objects/dist/data/messages';
import { Colors } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

interface IMessage {
    author: string,
    text: string,
    time: number
}

const firebaseConfig = {
    //Your firebase config here
    apiKey: "AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60",
    authDomain: "cabbuddies-1562982601192.firebaseapp.com",
    databaseURL: "https://cabbuddies-1562982601192.firebaseio.com",
    projectId: "cabbuddies-1562982601192",
    storageBucket: "cabbuddies-1562982601192.appspot.com",
    messagingSenderId: "1067716858916",
    appId: "1:1067716858916:web:298c461c0439c497d5b4b1",
    measurementId: "G-VQLJ1DMMJ5"
}

NROMessage.connectToFirebase(firebaseConfig);



//@ts-ignore
// if (firebase.apps.length === 0) {
//     //@ts-ignore
//     firebase.initializeApp(firebaseConfig);
// }
// LogBox.ignoreLogs(['Setting a timer for a long period of time'])
// //@ts-ignore
// const db = RealtimeDatabase.getDb({options: firebaseConfig})
// const chatsRef = db.collection('chats')

function nkLog(a?,b?,c?,d?,e?) {
    console.log('nk-log', a,b,c,d,e)
    reactotron.log!('nk-log', a,b,c,d,e);
}

let lastTS ="";

function DirectChatScreen(
    { ownUserProfile, ownUserId, route }:
        { ownUserProfile: IUser, ownUserId: string, route }
) {
    const friend = route.params.user as IUser;

    const [messages, setMessages] = useState([])
    const [extras,setExtras] = useState<{lastTs,message}>({lastTs:"",message:""});
   
    nkLog(`you are  :`, ownUserProfile,ownUserId);
    nkLog(`user to chat with :`, route.params.user);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: friend.firstName
        })
    }, [])

    useEffect(()=>{
        if(extras.message!=='')
        appendMessages([extras.message]);
    },[extras])


    useEffect(() => {
        nkLog(`main effect  :`, ownUserProfile,ownUserId);
        NROMessage.listenLiveMessages({
            ownUserId,
            directChatMessageReceived: (m) => {
                nkLog(`direct chat message`, m)
                if(m.from === friend.userId){
                    const gcm = {
                        "text": m.message,
                        "user": {
                            "_id": m.from,
                            "name": friend.firstName
                        },
                        "createdAt": new Date(parseInt(m.ts)).toString(),
                        "_id": m.ts
                    };
                    nkLog('gcm',gcm);
                    processNewMessage(gcm);
                }
            },
            otherMessageReceived: (message) => {
                nkLog('other', message)
            },
        });
    }, [])

    const processNewMessage=(message)=>{
        nkLog(extras.lastTs,message["_id"]);
        if(extras.lastTs!=message["_id"] && extras.message["text"] != message["text"]){
            nkLog('new message confirmed');
            setExtras({lastTs:message["_id"],message:message});
        }
    };

    const appendMessages = useCallback(
        (messages) => {

            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function handleSend(messages) {
        nkLog(`messages: `, messages[0].text, 'message', messages[0]);
        nkLog(messages[0]);
        NROMessage.sendDirectChatMessage(ownUserId, friend.userId, messages[0].text);
        //const message:IMessage = {author:userName,text:messages[0].text,time:new Date().getTime()};
        //RealtimeDatabase.pushToPath({path:`user/${friendMap[userName]}`,value:messages[0]});
        processNewMessage(messages[0])
    }

    if(!ownUserProfile){
        return <View></View>
    }

    const gUser = { _id: ownUserId, name: `${ownUserProfile.firstName} ${ownUserProfile.lastName}` };

    nkLog('pre-render',messages,gUser,handleSend);

    return (
    <View style={{backgroundColor: Colors.white, flex:1}}>
        <GiftedChat
        messages={messages} 
        user={gUser} 
        onSend={handleSend} />
    </View>)
}

function mapStateToProps(state: IAppState) {
    const { userState, authState } = state;
    return {
        ownUserProfile: userState.user?.data,
        ownUserId: authState.userId
    }
}

export default connect(mapStateToProps, null)(DirectChatScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})
