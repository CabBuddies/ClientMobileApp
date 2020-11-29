import { Container } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import { Screens } from '../../definitions/screen-definitions'

const FollowersScreen = ({navigation}) => {
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
            <Button onPress={()=>{
                navigation.navigate(Screens.PROFILE,{
                    VALUE:'GOOD'
                })
            }}>Good</Button>
            <Button onPress={()=>{
                navigation.navigate(Screens.PROFILE,{
                    VALUE:'Bad'
                })
            }}>Bad</Button>
        </Container>
    )
}

export default FollowersScreen

const styles = StyleSheet.create({})
