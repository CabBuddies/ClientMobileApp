import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import reactotron from '../../../dev/ReactotronConfig';
import { liveQuerySuggestion } from '../../api/query-api';

const UserGroupsScreen = () => {
    const [userSuggestions, setUserSuggestions] = React.useState<any[]>([]);

    React.useMemo(() => {
        liveQuerySuggestion("").then((result: any[]) => {
            setUserSuggestions(result);
        }).catch((error) => {
            reactotron.log!(`Query API error `, error);
        })
    }, []);
    const renderItem = ({ item }) => {
        return <View style={{ margin: 5 }}></View>
    }
    return (
        <FlatList data={userSuggestions} renderItem={renderItem}
            keyExtractor={item => (item) ? item.data._id : `${Date.now()}`}
        />
    )
}

export default UserGroupsScreen

const styles = StyleSheet.create({})
