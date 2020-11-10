import React from 'react'
// import { View, Text } from 'react-native';
import { Text, Container, Content, Body } from "native-base";
import { QueryPreview } from '../../../components/organisms'

// const queryDefault = {
//     query:"Ask a question. here any question about travels can be asked",
//     description: "You can ask any kind of question here, your questions will be answered by the right person",
//     queryStats: { upvotes: 4, comments:0,views:400 },
//     responses: [
//         {
//             author:"Krishna",
//             response: "You have asked the right questions Arjuna!", 
//         }
//     ],
// }
export default function QueryView({ route, navigation }) {
    const {key,author,draft,stats} = route.params;
    return (
        <Container>
            <Content>
                <QueryPreview username = {author} query ={draft} stats={stats} />
            </Content>
        </Container>
    )
}
