import { Container } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native'

const FollowersScreen = () => {
    return (
        <Container>
            {/* <FlatList data={cards?.result} renderItem={renderItem}
                keyExtractor={item => (item) ? item.data._id : `${Date.now()}`}
                ListEmptyComponent={placeholder}
                ListHeaderComponent={() => (<Searchbar
                    placeholder="Search"
                    onChangeText={() => Alert.alert(`othindu`)}
                    value=''
                />)}
                extraData={cards}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getQueries(defaultSearchRequest)} />}
            /> */}
        </Container>
    )
}

export default FollowersScreen

const styles = StyleSheet.create({})
