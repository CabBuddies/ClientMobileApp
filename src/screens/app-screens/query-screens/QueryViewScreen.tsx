import React, {useRef, useLayoutEffect, useMemo} from 'react'
import { View } from 'react-native';
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
import { Alert, StyleSheet } from 'react-native';
import CommentListView from '../../../components/molecules/CommentListView';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { TextInput as PaperInput } from 'react-native-paper';

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
    const snapPoints = useMemo(() => [0,'25%','50%','75%','90%'],[]);
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
            <Content>
                {
                    (loading && !queryData)?
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
                    : <QueryFullView query={queryData} onComment={getCommentFunc} commentDisabled={loading} />
                }
                </Content>
                <BottomSheet
                    ref={commentRef}
                    snapPoints = {snapPoints}
                    initialSnapIndex = {-1}
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
})
