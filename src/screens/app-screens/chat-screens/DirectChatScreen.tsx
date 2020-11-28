import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, LogBox, Button } from 'react-native'
import RealtimeDatabase from 'node-rest-objects/dist/rest/realtime.database'
import { IAppState } from '../../../redux/initialState'
import { connect } from 'react-redux'

interface IMessage{
    author:string,
    text:string,
    time:number
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

RealtimeDatabase.getApp({ options: firebaseConfig })

//@ts-ignore
// if (firebase.apps.length === 0) {
//     //@ts-ignore
//     firebase.initializeApp(firebaseConfig);
// }
// LogBox.ignoreLogs(['Setting a timer for a long period of time'])
// //@ts-ignore
// const db = RealtimeDatabase.getDb({options: firebaseConfig})
// const chatsRef = db.collection('chats')


function DirectChatScreen({ userName, _user }) {
    userName = userName.toLowerCase();
    const friendMap = {
        "abhilash": "karthik",
        "karthik": "abhilash"
    };
    const [user, setUser] = useState<any>(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
    // useEffect(() => {
    //     readUser()
    //     const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
    //         const messagesFirestore = querySnapshot
    //             .docChanges()
    //             .filter(({ type }) => type === 'added')
    //             .map(({ doc }) => {
    //                 const message = doc.data()
    //                 //createdAt is firebase.firestore.Timestamp instance
    //                 //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
    //                 return { ...message, createdAt: message.createdAt.toDate() }
    //             })
    //             .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    //         appendMessages(messagesFirestore)
    //     })
    //     RealtimeDatabase.observePath({path:`user/${friendMap[]}`})
    //     return () => unsubscribe()
    // }, [])
    useEffect(()=>{
        RealtimeDatabase.observePath({path:`user/${userName}`,callback:(val)=>{
            appendMessages([val]);
        }})
    },[])
    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )
    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        console.log(`messages: `, messages[0].text, 'username', userName,'message',messages[0]);
        //const message:IMessage = {author:userName,text:messages[0].text,time:new Date().getTime()};
        RealtimeDatabase.pushToPath({path:`user/${friendMap[userName]}`,value:messages[0]});
        appendMessages(messages)
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }

    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}

function mapStateToProps(state: IAppState) {
    const { userState } = state;
    return {
        userName: userState.user?.data.firstName
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