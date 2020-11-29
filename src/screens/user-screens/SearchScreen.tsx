import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';
import SimpleCard from '../../components/organisms/SimpleCard';
import * as UserAPI from '../../api/user-api';
import reactotron from '../../../dev/ReactotronConfig';
import { Screens } from '../../definitions/screen-definitions';
import { useNavigation } from '@react-navigation/native';
function SearchScreen() {

    const [searchQuery, setSearchQuery] = React.useState('');

    const [userSuggestions, setUserSuggestions] = React.useState<any[]>([]);

    React.useMemo(() => {
        console.log(searchQuery);
        UserAPI.liveUserSuggestion(searchQuery).then((result: any[]) => {
            setUserSuggestions(result);
        }).catch((error) => {
            reactotron.log!(`API error `, error);
        })
    }, [searchQuery]);

    const navigation = useNavigation();

    return (
        <FlatList
            data={userSuggestions}
            ListHeaderComponent={
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text: string) => { setSearchQuery(text) }}
                    value={searchQuery}
                />
            }
            ItemSeparatorComponent={() => <Divider style={{ marginTop: 1, marginBottom: 1 }} />}
            renderItem={({ item }) => <SimpleCard content={item} avatarSize={40} onPress={() => {
                navigation.navigate(Screens.USER_PROFILE,{
                    user:item.data
                })
            }}/>}
            keyExtractor={item => (item) ? item.data.userId : `${Date.now()}`}
        />
    )
}

const styles = StyleSheet.create({});

export default SearchScreen;