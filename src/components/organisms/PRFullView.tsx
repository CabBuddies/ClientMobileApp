import React, {useEffect, useState} from "react";
import { Alert, StyleSheet, ViewStyle } from "react-native";
import { CustomAvatar, QueryStats } from "../molecules";
import {Card, Colors, Paragraph, Snackbar, Text } from "react-native-paper"; 
import { Options } from "../atoms";
import { FullViewType, MenuModes, OpinionType } from "../../definitions/common-definitions";
import { useNavigation } from "@react-navigation/native";
import { bindActionCreators } from "redux";
import { editQuery, editResponse, removeQuery, removeResponse } from "../../redux/actions/query-actions";
import { connect } from "react-redux";
import { createOpinion, deleteOpinion, getOpinion } from "../../api/query-api";
import { createOpinionThunk, deleteOpinionThunk } from "../../redux/actions/opinion-action";
import { IAppState } from "../../redux/initialState";
import { showToast, timeSince } from "../../utils/Helpers";
import TagView from "../molecules/TagView";
import ImageSelectionContainer from "./ImageSelectionContainer";
import { openPostCreateForm, openResponseForm } from "../../utils/nav-utils";
import { IPost,IReply } from "node-rest-objects/dist/data/groups";
import { IGroupStats } from "../../definitions/ride-definitions";

type T = any
interface QueryViewProps{
    contentData:IPost,
	style?: ViewStyle | Array<ViewStyle> | null;
    onComment?:any,
    onPress?:() => void;
	commentDisabled?:any;
	ownUserId:string | undefined;
	changeQuery?:any;
	deleteQuery?:any;
	changeResponse?:any;
	deleteResponse?:any;
	addOpinion?:any;
	removeOpinion?:any;
	opinions?:Record<string,string>;
    headerNav?: () => void,
    itemNav?: () => void
}

const PRFullView = ({ contentData,style = null,
	onComment = () => Alert.alert(`happy commenting`),
	commentDisabled=false,
    headerNav = () => Alert.alert(`header clicked`),
    onPress=() => Alert.alert(`post card pressed`),
	itemNav = () => Alert.alert(`this will trigger an update`),
	ownUserId,
	deleteQuery,deleteResponse}: QueryViewProps
	) => {
	const [isCurrentUSer,setIsCurrentUser] = useState(false);
	const navigation = useNavigation();
	const { createdAt,author,title,body,stats,media}:IPost= contentData;
	
	useEffect(() => {
		setIsCurrentUser(author.userId === ownUserId!);
	},[contentData])

	const date:string = timeSince(new Date(createdAt))||(createdAt.split('T')[0] +" "+createdAt.split('T')[1].substring(0,5));
	let responseCount;

	
	const renderAvatar = (props) => {
		return <CustomAvatar size={24} {...props} data={author}/>
	} 

	const onUpdate = () => {
		openPostCreateForm(navigation,contentData,true);
	}
    return (
        <Card style={styles.card} onPress={onPress}>
			<Card.Title
                title={title}
                right={() => <Options onEdit={onUpdate} mode={MenuModes.CRUD} editable={isCurrentUSer} deletable={isCurrentUSer}/>}
            />
            <Card.Content>
            <Text style={{fontSize:20}}>{body}</Text>
				{
					media.length>0 &&
					<>
					<Text style={{marginTop:10,fontSize:15}}>Media:</Text>
					<ImageSelectionContainer defaultValue={media} readOnly />
					</>
				}
            </Card.Content>
			<Card.Title title={author?.firstName +' '+ author?.lastName} subtitle={date} left={(props) => renderAvatar(props)}/>
			<Card.Actions style={styles.actions}>
				<QueryStats 
				stats={stats} onComment = {onComment} 
				commentDisabled={commentDisabled} 
				// onDownVote={onDownVote}
				// onUpVote={onUpvote}
				/>
			</Card.Actions>
            
		</Card>
    )
}

function mapStateToProps(state:IAppState){
	const { queryOpinionState,authState } = state;
	return {
		opinions:queryOpinionState.opinionList,
		ownUserId:authState.userId,
	}
}
function mapDispatchToProps(dispatch){
	return {
		changeQuery:bindActionCreators(editQuery,dispatch),
		deleteQuery:bindActionCreators(removeQuery,dispatch),
		changeResponse:bindActionCreators(editResponse,dispatch),
		deleteResponse:bindActionCreators(removeResponse,dispatch),
		addOpinion:bindActionCreators(createOpinionThunk,dispatch),
		removeOpinion:bindActionCreators(deleteOpinionThunk,dispatch)
	}
}
const connector = connect(mapStateToProps,mapDispatchToProps);
export default connector(PRFullView)

const styles = StyleSheet.create({
	card:{
		borderTopWidth:0.5,
		borderTopColor:Colors.black,
		marginTop:5
	},
	actions:{
		borderWidth:0.5,
		borderColor:Colors.black
	},
	
	badge:{
		borderRadius:0,
		backgroundColor:Colors.amber900
	},
	query:{
		color:Colors.white,
		backgroundColor:Colors.blue600,
	},
	response:{
		color:Colors.white,
		backgroundColor:Colors.green500,
	}
})


//-------------------------- Clutter -----------------------------------------------------------------------
	// const onUpvote = (isUpVoted) => {
	// 	if(isUpVoted){
	// 		deleteOpinion(contentData,OpinionType.UPVOTE).then(opinion => {
	// 			showToast(`upvote removed for ${data._id}`);
	// 		}).catch(error => {
	// 			showToast(`could not remove upvote for ${data._id}`);
	// 		})
	// 	}
	// 	else{
	// 		createOpinion(contentData,OpinionType.UPVOTE).then(opinion => {
	// 			showToast(`upvote addded for ${data._id}`);
	// 		}).catch(error => {
	// 			showToast(`could not add upvote for ${data._id}`);
	// 		})
	// 	}
	// }
	// const onDownVote = (isDownVoted) => {
	// 	if(isDownVoted){
	// 		deleteOpinion(content,OpinionType.UPVOTE).then(opinion => {
	// 			showToast(`down-vote removed for ${data._id}`);
	// 		}).catch(error => {
	// 			showToast(`could not remove down-vote for ${data._id}`);
	// 		})
	// 	}
	// 	else{
	// 		createOpinion(content,OpinionType.UPVOTE).then(opinion => {
	// 			showToast(`down-vote addded for ${data._id}`);
	// 		}).catch(error => {
	// 			showToast(`could not add down-vote for ${data._id}`);
	// 		})
	// 	}
	// }
	// const onDelete = () => {
	// 	switch(type){
	// 		case FullViewType.QUERY:
	// 			Alert.alert(`this will delete the query ${content.data._id}`);
	// 			deleteQuery(content).then(() => {
	// 				navigation.navigate(Screens.GUIDE_ME);
	// 			})
				
	// 			break;
	// 		case FullViewType.RESPONSE:
	// 			Alert.alert(`this will delete the Response ${content.data._id}`);
	// 			deleteResponse(content);
	// 			break;
	// 	}
	// }
