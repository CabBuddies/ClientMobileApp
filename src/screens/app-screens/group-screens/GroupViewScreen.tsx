import { useNavigation } from '@react-navigation/native'
import { Container } from 'native-base';
import { IGroup, IPost, Post } from 'node-rest-objects/dist/data/groups';
import { User } from 'node-rest-objects/dist/data/user-management';
import SearchRESTObject from 'node-rest-objects/dist/rest/search.rest.object';
import React, { useEffect, useLayoutEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { IconButton, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import reactotron from '../../../../dev/ReactotronConfig';
import { getGroupPosts } from '../../../api/groups-api';
import { GroupPreview } from '../../../components/molecules';
import PRFullView from '../../../components/organisms/PRFullView';
import SimpleCard from '../../../components/organisms/SimpleCard';
import { IAppState } from '../../../redux/initialState';
import { showToast } from '../../../utils/Helpers';
import { openDirectChat, openPostCreateForm, showGroupPost, showUserProfile } from '../../../utils/nav-utils';

interface IGroupViewScreenProps {
    route: any;
    userId: string;
}

const GroupViewScreen = ({ route, navigation, userId, isVerified }) => {

    let groupData: IGroup | null = null;
    if (route && route.params && route.params.groupData) {
        groupData = route.params.groupData;
    }
    // const [postObj,setPostObj] = React.useState(new Post());

    // useEffect(() => {
    //     const post = new Post();
    //     if(groupData){
    //         post.data.groupId = groupData!._id;
    //         setPostObj(post);
    //     }
    // },[])
    const [searchRestObject, setSRO] = React.useState(new SearchRESTObject(new Post()));

    useEffect(() => {

    }, [])

    const [posts, setPosts] = React.useState<IPost[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {

        if (groupData) {
            const post = new Post();
            post.data.groupId = groupData._id;
            setSRO(new SearchRESTObject(post))
        }

    }, [groupData])

    useEffect(() => {
        fetchPosts();
    }, [searchRestObject])

    const fetchPosts = () => {
        setLoading(true);
        if (searchRestObject.data.data.groupId) {
            searchRestObject.request.sort = {
                "createdAt": groupData?.customAttributes.type === 'group' ? -1 : 1
            };
            showToast(groupData?.customAttributes.type + " " + searchRestObject.request.sort["createdAt"]);
            getGroupPosts(searchRestObject).then(result => {
                setPosts(searchRestObject.response.result.map(p => p.data));
                setLoading(false);
            }).catch(error => {
                reactotron.log!("Group API error", error);
            })
        }
    }
    const renderPosts = ({ item }: { item: IPost }) => (
        <PRFullView key={item._id} contentData={item} onPress={() => {
            showGroupPost(navigation, item);
        }} />
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton icon="plus-circle-outline" onPress={() => {
                    openPostCreateForm(navigation, groupData!);
                    // showToast('this will open the post creation screen',3000);
                }} />
            )
        })
    }, [])

    if (!groupData) {
        return (
            <View>
                <Text style={{ color: "red", fontSize: 25 }}>No group data found</Text>
            </View>
        )
    }
    const author = new User();
    author.data = groupData.author;
    return (
        <Container>
            <GroupPreview group={groupData} userId={userId} isVerified={isVerified} />
            <SimpleCard onPress={() => { showUserProfile(navigation, groupData?.author!) }} content={author} />
            <FlatList
                data={posts}
                renderItem={renderPosts}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Title style={{ color: "rgba(09,24,255,1)" }}>Posts</Title>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Title>No posts yet!!</Title>
                    </View>
                )}
            />
        </Container>
    )
}

function mapStateToProps(state: IAppState) {
    const { isConfirmed, userId, anonymous } = state.authState;
    return {
        isVerified: isConfirmed,
        userId: userId,
        isAnonymous: anonymous
    }
}
const connector = connect(mapStateToProps);
export default connector(GroupViewScreen);

const styles = StyleSheet.create({})
