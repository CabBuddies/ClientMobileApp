import { useNavigation } from '@react-navigation/native';
import { User, UserRelation } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native'
import { connect } from 'react-redux';
import reactotron from '../../../../dev/ReactotronConfig';

import * as UserRelationAPI from '../../../api/user-relation-api';
import SimpleCard from '../../../components/organisms/SimpleCard';
import { Screens } from '../../../definitions/screen-definitions';
import { IAppState } from '../../../redux/initialState';

const GroupChatListScreen = ({ isVerified, userId,isAnonymous }) => {

    const [relationList,setRelationList] = React.useState<UserRelation[]>([]);

    const ownUserId = userId;

    React.useEffect(()=>{
        UserRelationAPI.getAllRelations('accepted').then((result)=>{
            setRelationList(result);
        }).catch((error)=>{
            console.error(error);
            reactotron.log!(error);
        })
    },[])

    const navigation = useNavigation();

    return (
        <FlatList 
            data={relationList}
            renderItem={({item})=>{
                let renderUser = new User();
                if(item.data.followeeId.userId===ownUserId){
                    renderUser.data=item.data.followerId;
                }else{
                    renderUser.data=item.data.followeeId;
                }
                return <View style={{margin:2}}>
                            <SimpleCard content={renderUser} avatarSize={40} onPress={() => {
                                navigation.navigate(Screens.CHAT_DIRECT,{
                                    user:renderUser.data
                                })
                            }}/>
                        </View>
            }}
        />
    )
}

function mapStateToProps(state: IAppState) {
    const { isConfirmed, userId,anonymous } = state.authState;
    return {
        isVerified: isConfirmed,
        userId: userId,
        isAnonymous:anonymous
    }
}

const connector = connect(mapStateToProps);
export default connector(GroupChatListScreen);

const styles = StyleSheet.create({})
