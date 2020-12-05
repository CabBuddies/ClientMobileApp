import React, {useEffect, useState} from "react";
import { Alert, StyleSheet, ViewStyle } from "react-native";
import { CustomAvatar, QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { IQuery, IResponse, Query,Response } from "node-rest-objects/dist/data/queries";
import { Badge, Card, Chip, Colors, Paragraph, Snackbar, Text } from "react-native-paper"; 
import { Options } from "../atoms";
import { FullViewType, MenuModes, OpinionType } from "../../definitions/common-definitions";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../definitions/screen-definitions";
import { bindActionCreators } from "redux";
import { editQuery, editResponse, removeQuery, removeResponse } from "../../redux/actions/query-actions";
import { connect } from "react-redux";
import { createOpinion, deleteOpinion, getOpinion } from "../../api/query-api";
import { createOpinionThunk, deleteOpinionThunk } from "../../redux/actions/opinion-action";
import { IAppState } from "../../redux/initialState";
import { showToast, timeSince } from "../../utils/Helpers";
import TagView from "../molecules/TagView";
import ImageSelectionContainer from "./ImageSelectionContainer";
import { goToQueryCreateScreen, goToQueryListScreen, openResponseForm } from "../../utils/nav-utils";

type T = any
interface QueryViewProps{
	type:FullViewType
    content:Query | Response,
	style?: ViewStyle | Array<ViewStyle> | null;
	onComment?:any,
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

const QRFullView = ({ type = FullViewType.QUERY, content,style = null,
	onComment = () => Alert.alert(`happy commenting`),
	commentDisabled=false,
	headerNav = () => Alert.alert(`header clicked`),
	itemNav = () => Alert.alert(`this will trigger an update`),
	ownUserId,
	deleteQuery,deleteResponse}: QueryViewProps
	) => {
	const [isCurrentUSer,setIsCurrentUser] = useState(false);
	const navigation = useNavigation();
	const data:IQuery|IResponse = content.data;
	const { createdAt,author,published,stats }:{createdAt:string,author:IUser,published:IQueryContent,stats:IQueryStats}= data;
	
	useEffect(() => {
		setIsCurrentUser(data.author.userId === ownUserId!);
	},[content])

	const date:string = timeSince(new Date(createdAt))||(createdAt.split('T')[0] +" "+createdAt.split('T')[1].substring(0,5));
	let responseCount;

	
	const renderAvatar = (props) => {
		return <CustomAvatar size={24} {...props} data={author}/>
	} 
	const onUpvote = (isUpVoted) => {
		if(isUpVoted){
			deleteOpinion(content,OpinionType.UPVOTE).then(opinion => {
				showToast(`upvote removed for ${data._id}`);
			}).catch(error => {
				showToast(`could not remove upvote for ${data._id}`);
			})
		}
		else{
			createOpinion(content,OpinionType.UPVOTE).then(opinion => {
				showToast(`upvote addded for ${data._id}`);
			}).catch(error => {
				showToast(`could not add upvote for ${data._id}`);
			})
		}
	}
	const onDownVote = (isDownVoted) => {
		if(isDownVoted){
			deleteOpinion(content,OpinionType.UPVOTE).then(opinion => {
				showToast(`down-vote removed for ${data._id}`);
			}).catch(error => {
				showToast(`could not remove down-vote for ${data._id}`);
			})
		}
		else{
			createOpinion(content,OpinionType.UPVOTE).then(opinion => {
				showToast(`down-vote addded for ${data._id}`);
			}).catch(error => {
				showToast(`could not add down-vote for ${data._id}`);
			})
		}
	}
	const onDelete = () => {
		switch(type){
			case FullViewType.QUERY:
				Alert.alert(`this will delete the query ${content.data._id}`);
				deleteQuery(content).then(() => {
					goToQueryListScreen(navigation);
				});
				
				break;
			case FullViewType.RESPONSE:
				Alert.alert(`this will delete the Response ${content.data._id}`);
				deleteResponse(content);
				break;
		}
	}
	const onUpdate = () => {
		switch(type){
			case FullViewType.QUERY:
				goToQueryCreateScreen(navigation,content.data.published);
				break;
			case FullViewType.RESPONSE:
				openResponseForm(navigation,content.data as IResponse)
				break;
		}
	}
    return (
        <Card style={styles.card}>
			<Badge visible size={25} style={[styles.badge,styles[type]]}>{type.toUpperCase()}</Badge>
			<Card.Title title={published?.title} 
				right={(props) => <Options {...props} mode={MenuModes.CRUD} deletable={isCurrentUSer} editable={isCurrentUSer} onDelete={onDelete} onEdit={onUpdate}/>}
				style={{margin:0}}
			/>
			<Card.Content>
				<Text style={{fontSize:20}}>{published?.body}</Text>
				{
					published?.media.length>0 &&
					<>
					<Text style={{marginTop:10,fontSize:15}}>Media:</Text>
					<ImageSelectionContainer defaultValue={published?.media as string[]} readOnly />
					</>
				}
				
				<TagView tags={published?.tags}/>
			</Card.Content>
				<Card.Title title={author?.firstName +' '+ author?.lastName} subtitle={date} left={(props) => renderAvatar(props)}/>
			<Card.Actions style={styles.actions}>
				<QueryStats 
				stats={stats} onComment = {onComment} 
				commentDisabled={commentDisabled} 
				onDownVote={onDownVote}
				onUpVote={onUpvote}
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
export default connector(QRFullView)

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


