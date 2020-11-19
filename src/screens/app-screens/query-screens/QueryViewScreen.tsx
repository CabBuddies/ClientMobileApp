import React, {useRef, useLayoutEffect} from 'react'
// import { View, Text } from 'react-native';
import { Text, Container, Content, Body } from "native-base";
import { QueryPreview } from '../../../components/organisms'
import { IQueryState } from '../../../redux/initialState';
import { connect } from 'react-redux';
import reactotron from '../../../../dev/ReactotronConfig';
import QueryFullView from '../../../components/organisms/QueryFullView';
import { Placeholder, PlaceholderLine, PlaceholderMedia, Shine } from 'rn-placeholder';
import { HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import {QueryStackParamList} from "../../../navigations/QueryNavigator";
import { Screens } from '../../../definitions/screen-definitions';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { IQuery } from 'node-rest-objects/dist/data/queries';
import { bindActionCreators } from 'redux';
import { loadComments, writeComment } from '../../../redux/actions/query-actions';
import { CButton } from '../../../components/atoms';
import { Alert } from 'react-native';
import CommentListView from '../../../components/molecules/CommentListView';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

type QueryViewScreenNav = StackNavigationProp<QueryStackParamList>;
interface QueryViewScreenProps{
    navigation: QueryViewScreenNav;
    queryData:RESTObject<IQuery>;
    newComment?:any;
    getComments?:any;
    loading:boolean;
}

const defaultRequest = {
    sort:{
        "createdAt":-1
    }
}



function QueryView({ navigation, queryData,loading, newComment, getComments }: QueryViewScreenProps) {
    reactotron.log!("queryData in QUERY_VIEW",queryData,loading);
    const commentRef = useRef<any>();
    const fall = new Animated.Value(1);
    const cancelNav = () => {
        navigation.navigate(Screens.GUIDE_ME);
    }
    const getCommentFunc = () => {
        getComments(queryData,defaultRequest)
        .then(() => {
            if(commentRef.current){
                commentRef.current.snapTo(1);
            }
        })
        
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft:() => <HeaderBackButton onPress={cancelNav}/>,
            headerRight:() => (
                <CButton transparent title="Respond" container={{flex:0}} onPress={() => Alert.alert(`this will trigger response`)} />
            )
        });
    },[navigation])

    return (
        <Container>
                {
                    (loading || !queryData)?
                    (<Placeholder
                        Left={PlaceholderMedia}
                        Animation={(props) => <Shine {...props} reverse={false}/>}
                        style = {{paddingTop:20}}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                        
                    </Placeholder>)
                    : <QueryFullView query={queryData} onComment={getCommentFunc} />
                }
                <BottomSheet
                    ref={commentRef}
                    snapPoints = {["90%","5%","0%"]}
                    callbackNode={fall}
                    borderRadius={10}
                    enabledGestureInteraction={true}
                    renderContent={() => <CommentListView />}
                    renderHeader = {() => <Text>Comments</Text>}
                    initialSnap={2}
                    onOpenStart = {() => reactotron.log!("bottom-sheet-opened")}
                />
                
        </Container>
    )
}

function mapStateToProps(state){
    const { queryState } = state;
    return {
        queryData : queryState.query,
        loading : queryState.loading
    }
}
function mapDispatchToProps(dispatch){
    return {
        newComment: bindActionCreators(writeComment,dispatch),
        getComments: bindActionCreators(loadComments,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(QueryView)
