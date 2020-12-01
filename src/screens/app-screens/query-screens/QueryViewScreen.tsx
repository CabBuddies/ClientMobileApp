import React, {useRef, useLayoutEffect, useMemo, useEffect} from 'react'
import { View } from 'react-native';
import { Container, Content, Body } from "native-base";
import { connect } from 'react-redux';
import reactotron from '../../../../dev/ReactotronConfig';
import PostFullView from '../../../components/organisms/PostFullView';
import { HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import {QueryStackParamList} from "../../../navigations/QueryNavigator";
import { Screens } from '../../../definitions/screen-definitions';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import { IQuery, Response, Query } from 'node-rest-objects/dist/data/queries';
import { bindActionCreators } from 'redux';
import { loadComments, writeComment,loadResponses,writeResponse } from '../../../redux/actions/query-actions';
import { CButton } from '../../../components/atoms';
import { Alert, StyleSheet } from 'react-native';
import CommentListView from '../../../components/molecules/CommentListView';
import BottomSheet from '@gorhom/bottom-sheet';
import { ContentLoading } from '../../../components/molecules';
import { FullViewType, PlaceholderSize } from '../../../definitions/common-definitions';
import ResponseList from '../../../components/organisms/ResponseList';
import { Colors } from 'react-native-paper';
import { VirtualizedContent } from '../../../components/organisms';

type QueryViewScreenNav = StackNavigationProp<QueryStackParamList>;
interface QueryViewScreenProps{
    navigation: QueryViewScreenNav;
    queryData:Query;
    responses:Response[];
    getResponses?:any;
    newComment?:any;
    getComments?:any;
    loading:boolean;
}

const defaultRequest = {
    query:{
        "status":"published"
    },
    sort:{
        "createdAt":-1
    }
}



function QueryView({ navigation, queryData,loading, getComments,responses, getResponses }: QueryViewScreenProps) {
    const commentRef = useRef<any>();
    const snapPoints = useMemo(() => [0,'25%','50%','75%'],[]);
    const cancelNav = () => {
        navigation.navigate(Screens.GUIDE_ME);
    }
    const renderSheetHeader = () => {
        return (
            <View style={styles.sheetHeader}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                </View>
            </View>
        )
    }
    const getCommentFunc = () => {
        getComments(queryData,defaultRequest)
        .then(() => {
            if(commentRef.current){
                reactotron.log!("commentRef",commentRef);
                commentRef.current.snapTo(1);
            }
        })
        
    }
    
    useEffect(() => {
        if(queryData){
            getResponses(queryData,defaultRequest); 
        }
    },[queryData])

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
                <VirtualizedContent>
                    {
                        (loading && !queryData)?
                        (<ContentLoading size={PlaceholderSize.MEDIUM}/>)
                        : <PostFullView type={FullViewType.QUERY} content={queryData} onComment={getCommentFunc} commentDisabled={loading} />
                    }
                    <ResponseList />
                </VirtualizedContent>
                <BottomSheet
                    ref={commentRef}
                    snapPoints = {snapPoints}
                    initialSnapIndex = {-1}
                    backgroundComponent={() => <View style={styles.bottomSheetBack}/>}
                >
                    <CommentListView/> 
                </BottomSheet>
                
        </Container>
    )
}

function mapStateToProps(state){
    const { queryState } = state;
    return {
        queryData : queryState.query,
        loading : queryState.loading,
        responses:queryState.response
    }
}
function mapDispatchToProps(dispatch){
    return {
        newComment: bindActionCreators(writeComment,dispatch),
        getComments: bindActionCreators(loadComments,dispatch),
        newResponse: bindActionCreators(writeResponse,dispatch),
        getResponses: bindActionCreators(loadResponses,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(QueryView)

const styles = StyleSheet.create({
    sheetHeader: {
        backgroundColor: '#eeeeee',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      responseContainer:{
          flex:1,
          paddingTop:40
      },
      bottomSheetBack:{
          backgroundColor:Colors.white,
      }
})
