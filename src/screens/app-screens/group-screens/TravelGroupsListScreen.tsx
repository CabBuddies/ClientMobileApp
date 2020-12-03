import React, { useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ImagePicker } from '../../../components/organisms';
import { Button, Searchbar } from 'react-native-paper';
import RichTextEditor from '../../../components/organisms/RichTextEditor';
import RealtimeDatabase from 'node-rest-objects/dist/rest/realtime.database';
import { liveQuerySuggestion } from '../../../api/query-api';
import reactotron from '../../../../dev/ReactotronConfig';
import SimpleCard from '../../../components/organisms/SimpleCard';
import { getAllGroups } from '../../../api/groups-api';
import { Icon, Row } from 'native-base';
import { showGroupView } from '../../../utils/nav-utils';
import { useNavigation } from '@react-navigation/native';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { IGroup,Group } from 'node-rest-objects/dist/data/groups';

export default function TravelGroupsListScreen({ route }) {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [userSuggestions, setUserSuggestions] = React.useState<RESTObject<IGroup>[]>([]);
    const navigation = useNavigation();

    // FIXME - if no from and to, show all rides available now from users location
    // TODO - use these coordinates and give user rides matching them
    let fromLoc;
    let toLoc;
    if(route) {
        fromLoc = route.params.fromLocation;
        toLoc = route.params.toLocation;
    }

    useEffect(() => {
        getAllGroups({}).then(results => {
            setUserSuggestions(results);
        });
    }, []);

    // React.useMemo(() => {
    //     console.log(searchQuery);
    //     liveQuerySuggestion(searchQuery).then((result: any[]) => {
    //         setUserSuggestions(result);
    //     }).catch((error) => {
    //         reactotron.log!(`Groups API error `, error);
    //     })
    // }, [searchQuery]);

    const renderItem = ({ item }:{item:RESTObject<IGroup>}) => (<SimpleCard content={item as Group} onPress={() => showGroupView(navigation,item.data)} avatarSize={35} />)

    return (
        <>
            {/* <Searchbar
                placeholder="Search"
                onChangeText={(text: string) => {
                    setSearchQuery(text)
                }}
                onBlur={(e) => reactotron.log!(`on blur spacebar: `, e)}
                value={searchQuery}
            /> */}

            <FlatList data={userSuggestions} renderItem={renderItem}
                keyExtractor={item => (item) ? item.data._id : `${Date.now()}`}
                // ListEmptyComponent={placeholder}
                ListHeaderComponent={() => (
                    //TODO - IMPLEMENT FILTERS
                    <Row style={{
                        marginHorizontal: 10, marginTop: 10
                    }}>
                        <Icon type="MaterialCommunityIcons" name="filter" />
                        <Text style={{
                            fontSize: 20,
                            fontStyle: 'italic',
                        }}>Apply Filters</Text>
                    </Row>
                )}
            // refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getQueries(defaultSearchRequest)} />}
            />
        </>
    )
}
