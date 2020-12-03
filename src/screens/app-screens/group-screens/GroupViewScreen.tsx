import { useNavigation } from '@react-navigation/native'
import { Container } from 'native-base';
import { IGroup } from 'node-rest-objects/dist/data/groups';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import { GroupPreview } from '../../../components/molecules';

interface IGroupViewScreenProps{
    route:any;
}

const GroupViewScreen = ({route}:IGroupViewScreenProps) => {

    let groupData:IGroup|null = null;
    if(route && route.params && route.params.groupData){
        groupData = route.params.groupData;
    }
    const navigation = useNavigation();

    if(!groupData){
        return (
            <View>
                <Text style={{color:"red",fontSize:25}}>No group data found</Text>
            </View>
        )
    }
    return (
       <Container>
          <GroupPreview group={groupData}/>
          <FlatList
            data={[]}
            renderItem={({item,index}) => <Text>{item}</Text>}
            keyExtractor = {(item,index) => index.toString()}
            ListHeaderComponent={() => (
                    <View style={{flex:1,alignItems:"center"}}>
                        <Title style={{color:"rgba(09,24,255,1)"}}>Posts</Title>
                    </View>
            )}
            ListEmptyComponent = {() => (
                <View style={{flex:1,alignItems:"center"}}>
                    <Title>No posts yet!!</Title>
                </View>
            )}
          />
        </Container>
    )
}

export default GroupViewScreen

const styles = StyleSheet.create({})
