import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import { Colors, Divider, Searchbar } from 'react-native-paper';
import SimpleCard from '../../components/organisms/SimpleCard';
import * as UserAPI from '../../api/user-api';
import reactotron from '../../../dev/ReactotronConfig';
import { Screens } from '../../definitions/screen-definitions';
import { useNavigation } from '@react-navigation/native';
import * as NavUtils from '../../utils/nav-utils';
import { User } from 'node-rest-objects/dist/data/user-management';
function SearchScreen() {

    const [searchQuery, setSearchQuery] = React.useState('');

    const [userSuggestions, setUserSuggestions] = React.useState<User[]>([]);

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
                    style={styles.searchbar}
                />
            }
            ItemSeparatorComponent={() => <Divider style={{ marginTop: 1, marginBottom: 1 }} />}
            renderItem={({ item }) => (
                <View style={styles.userCard}>
                    <SimpleCard content={item} avatarSize={40} onPress={() => {
                    // navigation.navigate(Screens.USER_PROFILE,{
                    //     user:item.data
                    // })
                        NavUtils.showUserProfile(navigation,item.data);
                }}/>
                </View>
            )}
            keyExtractor={item => (item) ? item.data.userId : `${Date.now()}`}
        />
    )
}

const styles = StyleSheet.create({
    searchbar: {
        margin: 5,
        borderStyle: "solid",
        borderColor: Colors.black
    },
    userCard:{
        margin: 2
    }

});

export default SearchScreen;