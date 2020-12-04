import { Container } from 'native-base'
import { IPost } from 'node-rest-objects/dist/data/groups'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ContentLoading } from '../../../components/molecules'
import PRFullView from '../../../components/organisms/PRFullView'
import { PlaceholderSize } from '../../../definitions/common-definitions'

const PostViewScreen = ({route}) => {

    let postData:IPost|null = null;
    if(route && route.params && route.params.data){
        postData = route.params.data;
    }
    return (
        <Container>
                <FlatList
                    ListHeaderComponent = {() => (
                            (!postData)?
                            (<ContentLoading size={PlaceholderSize.MEDIUM}/>)
                            : 
                            <PRFullView key={postData._id} contentData={postData}/>
                        
                    )}
                    data={[]}
                    renderItem={null}
                    // ListFooterComponent={() =>  <ResponseList onCommentPressed={onResponseComment} sheetRef={commentRef}/>}
                    // onRefresh={() => {
                    //     getResponses(queryData,defaultRequest)
                    // }}
                />
                
                {/* <BottomSheet
                    ref={commentRef}
                    snapPoints = {snapPoints}
                    initialSnapIndex = {-1}
                    backgroundComponent={() => <View style={styles.bottomSheetBack}/>}
                    handleComponent={renderSheetHeader}
                >
                    {
                        (response)?<CommentListView response={response} onCommentAdded={onRespCommentAdded}/>
                        :<CommentListView />
                    }
                </BottomSheet> */}
                
        </Container>
    )
}

export default PostViewScreen

const styles = StyleSheet.create({})
