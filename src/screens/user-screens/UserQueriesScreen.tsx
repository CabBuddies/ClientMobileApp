import { IQuery } from 'node-rest-objects/dist/data/queries';
import { IUser } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import reactotron from '../../../dev/ReactotronConfig';
import { getAllQueries, liveQuerySuggestion } from '../../api/query-api';
import { QueryPreview } from '../../components/organisms';


const UserQueriesScreen = ({ route }) => {
    const [userSuggestions, setUserSuggestions] = React.useState<IQuery[]>([]);

    let user: IUser | null = null;

    reactotron.log!(`in users queries screen`,route);

    if(route && route.params) {
        user = route.params;
    }

    React.useEffect(() => {
        getAllQueries({
            query:{
                "author": user?.userId
            }
        }).then(({result}) => {
            reactotron.log!(`got user queries`, result);
            setUserSuggestions(result.map((r)=>r.data));
        }).catch((error) => {
            reactotron.log!(`Query API error `, error);
        })
    }, [route.params]);
    const renderItem = ({ item }) => {
        return <View style={{ margin: 5 }}><QueryPreview query={item} /></View>
    }

    return (
        <FlatList data={userSuggestions} renderItem={renderItem}
            keyExtractor={item => (item) ? item._id : `${Date.now()}`}
        />
    )
}

export default UserQueriesScreen

const styles = StyleSheet.create({})
