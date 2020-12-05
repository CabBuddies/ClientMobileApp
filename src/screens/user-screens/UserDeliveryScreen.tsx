import { Group, IGroup } from 'node-rest-objects/dist/data/groups';
import { IQuery } from 'node-rest-objects/dist/data/queries';
import { IUser } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import reactotron from '../../../dev/ReactotronConfig';
import { getAllGroups } from '../../api/groups-api';
import { QueryPreview } from '../../components/organisms';
import SimpleCard from '../../components/organisms/SimpleCard';


const UserDeliveryScreen = ({ route }) => {
    const [userSuggestions, setUserSuggestions] = React.useState<Group[]>([]);

    let user: IUser | null = null;

    reactotron.log!(`in users queries screen`,route);

    if(route && route.params) {
        user = route.params;
    }

    React.useEffect(() => {
        getAllGroups({
            query:{
                "author": user?.userId
            }
        },'delivery').then((result) => {
            reactotron.log!(`got user queries`, result);
            setUserSuggestions(result as Group[]);
        }).catch((error) => {
            reactotron.log!(`Query API error `, error);
        })
    }, [route.params]);
    const renderItem = ({ item }) => {
        return <View style={{ margin: 5 }}><SimpleCard content={item}  /></View>
    }

    return (
        <FlatList data={userSuggestions} renderItem={renderItem}
            keyExtractor={item => (item) ? item.data._id : `${Date.now()}`}
        />
    )
}

export default UserDeliveryScreen

const styles = StyleSheet.create({})
