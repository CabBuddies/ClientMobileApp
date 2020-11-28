import React, { useState, useEffect, useLayoutEffect } from 'react'
import { FlatList, Alert, RefreshControl } from 'react-native'
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
import { Searchbar } from 'react-native-paper';
import { ContentLoading } from '../../../components/molecules';
import { PlaceholderSize } from '../../../definitions/common-definitions';
import { liveQuerySuggestion } from '../../../api/query-api';
import reactotron from '../../../../dev/ReactotronConfig';

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

function TravelQueryScreen({ navigation, cards, loading, error, getQueries, getQuery, queryData }: TravelQueryScreenProps) {

    let searchBar;

    const [searchQuery, setSearchQuery] = React.useState('');
    const [userSuggestions, setUserSuggestions] = React.useState<any[]>([]);

    React.useMemo(() => {
        console.log(searchQuery);
        liveQuerySuggestion(searchQuery).then((result: any[]) => {
            setUserSuggestions(result);
        }).catch((error) => {
            reactotron.log!(`Query API error `, error);
        })
    }, [searchQuery]);

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

    // const placeholder = () => {
    //     const x = new Array(10).fill({});
    //     let components;
    //     if (error) {
    //         components =
    //             (<Content>
    //                 <Text style={{ fontSize: 30, color: "red" }}>Oops!Error fetching queries!</Text>
    //             </Content>)
    //     }
    //     else {
    //         components = x.map((e, i) => <ContentLoading key={e + '' + i} size={PlaceholderSize.MEDIUM} />)
    //     }
    //     return (<>{components}</>);
    // }

    const renderItem = ({ item }) => {
        reactotron.log!(`106.TQS `, searchBar);
        return <QueryPreview query={item} itemNav={() => nav(item)} />
    }

    return (
        <>
            <Searchbar
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
                // ListEmptyComponent={placeholder}
                // ListHeaderComponent={() => (
                    
                // )}
            // refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getQueries(defaultSearchRequest)} />}
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