// import React, { useState, useEffect } from 'react';
// import { useCallback } from 'react';
// import { View, Text } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';


// export default function DirectChatScreen() {

//     const [messages, setMessages] = useState<any>([]);

//     useEffect(() => {
//         setMessages([
//             {
//                 _id: 1,
//                 text: 'Hello developer',
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'React Native',
//                     avatar: 'https://placeimg.com/140/140/any',
//                 },
//             },
//         ])
//     }, [])

//     const onSend = useCallback((messages = []) => {
//         setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//     }, [])


//     return (
//         <GiftedChat
//             messages={messages}
//             onSend={messages => onSend(messages)}
//             user={{
//                 _id: 1,
//             }}
//         />
//     )
// }
import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, LogBox, Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

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
//@ts-ignore
if (firebase.apps.length === 0) {
    //@ts-ignore
    firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
//@ts-ignore
const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function DirectChatScreen() {
    const [user, setUser] = useState<any>(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

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
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
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
});