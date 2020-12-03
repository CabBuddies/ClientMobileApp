import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { FlatList, Alert, RefreshControl, View } from 'react-native'
import { Container, Content, Item, List, Text, Button } from 'native-base';
import { CButton } from '../../../components/atoms'
import { QueryPreview } from '../../../components/organisms'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine, Loader } from "rn-placeholder";
import { StackNavigationProp } from "@react-navigation/stack";
import { QueryStackParamList } from "../../../navigations/QueryNavigator";
import { Screens } from '../../../definitions/screen-definitions';
import { fetchAllQueries } from "../../../redux/actions/query-list-action"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchQuery } from '../../../redux/actions/query-actions';
import { IQueryListResponse } from '../../../definitions/query-definitions';
import { Colors, Searchbar } from 'react-native-paper';
import { ContentLoading } from '../../../components/molecules';
import { PlaceholderSize } from '../../../definitions/common-definitions';
import { liveQuerySuggestion } from '../../../api/query-api';
import reactotron from '../../../../dev/ReactotronConfig';
import { useFocusEffect } from '@react-navigation/native';

interface QueryRequest {
    query?: any
    pageNum?: number;
    pageSize?: number;
    sort?: Record<string, any>
}
enum ResultOrder {
    ASCENDING = 1,
    DESCENDING = -1
}
type TQScreenNav = StackNavigationProp<QueryStackParamList>;
interface TravelQueryScreenProps {
    navigation: TQScreenNav;
    cards: IQueryListResponse;
    loading: boolean;
    error: string;
    getQueries: any;
    getQuery: any;
    queryData: any;
}

const defaultSearchRequest: QueryRequest = {
    query: {
        "status": "published"
    },
    sort: {
        "createdAt": ResultOrder.DESCENDING
    },
    pageNum: 1
}

function TravelQueryScreen({ navigation,getQueries, getQuery, queryData }: TravelQueryScreenProps) {

    let searchBar;

    const [searchQuery, setSearchQuery] = React.useState('');
    const [userSuggestions, setUserSuggestions] = React.useState<any[]>([]);
    const [loading,setLoading] = React.useState<boolean>(true);
    const [refreshing,setRefreshing] = React.useState(false);

    useFocusEffect(
        useCallback(() => {
            liveQuerySuggestion("").then((result: any[]) => {
            setUserSuggestions(result);
        }).catch((error) => {
            reactotron.log!(`Query API error `, error);
        })
        },[])
    )

    const fetchQueries = () => {
        setLoading(true);
        liveQuerySuggestion(searchQuery).then((result: any[]) => {
            setUserSuggestions(result);
            setLoading(false)
        }).catch((error) => {
            reactotron.log!(`Query API error `, error);
        })
    }

    React.useMemo(() => {
        console.log(searchQuery);
        fetchQueries();
    }, [searchQuery,navigation]);

    // useEffect(() => {
    //     getQueries(defaultSearchRequest);
    // }, [queryData])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CButton transparent title="Create" container={{ flex: 0 }} onPress={newQueryNav} />
            )
        })
    }, [navigation])

    const nav = (item) => {
        getQuery(item);
        navigation.navigate(Screens.QUERY_VIEW, { name: "Query View" });

    }

    const newQueryNav = () => {
        navigation.navigate(Screens.QUERY_CREATE);
    }

    const placeholder = () => {
        const x = new Array(10).fill({});
        let components;
       
        if(loading) {
            components = x.map((e, i) => <ContentLoading key={e + '' + i} size={PlaceholderSize.MEDIUM} />)
        }
        else{
            components = (
                <View>
                <Text style={{fontSize:30}}> No Queries Found </Text>
                </View>
            )
        }
        return (<>{components}</>);
    }

    const renderItem = ({ item }) => {
        return <View style={{margin: 5}}><QueryPreview query={item} itemNav={() => nav(item)} /></View>
    }

    return (
        <>
            <Searchbar
                style={{
                    margin: 5,
                    borderStyle: "solid",
                    borderColor: Colors.black
                }}
                ref={(el) => { searchBar = el }}
                placeholder="Search"
                onChangeText={(text: string) => {
                    setSearchQuery(text)
                }}
                onBlur={(e) => reactotron.log!(`on blur spacebar: `, e)}
                value={searchQuery}
            />
            <FlatList data={userSuggestions} renderItem={renderItem}
                keyExtractor={item => (item) ? item.data._id : `${Date.now()}`}
                ListEmptyComponent={placeholder}
                contentContainerStyle={{backgroundColor:"white"}}
                // ListHeaderComponent={() => (

                // )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
                    setRefreshing(true);
                    fetchQueries();
                    setRefreshing(false);
                }} />}
            />
        </>
    )
}

function mapStateToProps(state) {
    const { queryListState, queryState } = state;
    return {
        cards: queryListState.queries,
        loading: queryListState.loading,
        error: queryListState.error,
        queryData: queryState.query
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getQueries: bindActionCreators(fetchAllQueries, dispatch),
        getQuery: bindActionCreators(fetchQuery, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelQueryScreen);