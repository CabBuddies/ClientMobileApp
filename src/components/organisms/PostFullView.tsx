import React, {useEffect, useState} from "react";
import { Alert, StyleSheet, ViewStyle } from "react-native";
import { CustomAvatar, QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { IQuery, IResponse, Query,Response } from "node-rest-objects/dist/data/queries";
import { Badge, Card, Chip, Colors, Paragraph, Text } from "react-native-paper"; 
import { Options } from "../atoms";
import reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { FullViewType, MenuModes, OpinionType } from "../../definitions/common-definitions";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../definitions/screen-definitions";
import { bindActionCreators } from "redux";
import { editQuery, editResponse, removeQuery, removeResponse } from "../../redux/actions/query-actions";
import { connect } from "react-redux";
import { createOpinion, getOpinion } from "../../api/query-api";
import { createOpinionThunk, deleteOpinionThunk } from "../../redux/actions/opinion-action";
import { IAppState } from "../../redux/initialState";
import { timeSince } from "../../utils/Helpers";
import TagView from "../molecules/TagView";
import ImageSelectionContainer from "./ImageSelectionContainer";

type T = any
interface QueryViewProps{
	type:FullViewType
    content:Query | Response,
	style?: ViewStyle | Array<ViewStyle> | null;
	onComment?:any,
	commentDisabled?:any;
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

const PostFullView = ({ type = FullViewType.QUERY, content,style = null,
	onComment = () => Alert.alert(`happy commenting`),
	commentDisabled=false,
	headerNav = () => Alert.alert(`header clicked`),
	itemNav = () => Alert.alert(`this will trigger an update`),
	deleteQuery,deleteResponse,changeResponse,changeQuery,
	addOpinion,removeOpinion, opinions}: QueryViewProps
	) => {

	const navigation = useNavigation();
	const data:IQuery|IResponse = content.data;
	const { createdAt,author,published,stats }:{createdAt:string,author:IUser,published:IQueryContent,stats:IQueryStats}= data;
	const date:string = timeSince(new Date(createdAt))||(createdAt.split('T')[0] +" "+createdAt.split('T')[1].substring(0,5));
	let responseCount;
	const generateTags = () => {
		switch(type){
			case FullViewType.QUERY:
				responseCount = stats.responseCount;
				return published?.tags;
			case FullViewType.RESPONSE:
				return ["RESPONSE"];
		}
	}
	let tags = generateTags();
	const renderAvatar = (props) => {
		return <CustomAvatar size={24} {...props} data={author}/>
	} 
	// const onUpvote = () => {
	// 	if(currentOpinions[OpinionType.UPVOTE]===''){
	// 		addOpinion(content,OpinionType.UPVOTE).then(() => {
	// 			// TODO: need to refetch opinions
	// 		});
	// 	}
	// 	else{
	// 		removeOpinion(currentOpinions[OpinionType.UPVOTE]);
	// 	}
	// }
	// const onDownVote = () => {
	// 	if(currentOpinions[OpinionType.DOWNVOTE]===''){
	// 		addOpinion(content,OpinionType.DOWNVOTE).then(() => {
	// 			//TODO: need to refetch opinions
	// 		});
	// 	}
	// 	else{
	// 		removeOpinion(currentOpinions[OpinionType.DOWNVOTE]);
	// 	}
	// }
	const onDelete = () => {
		switch(type){
			case FullViewType.QUERY:
				Alert.alert(`this will delete the query ${content.data._id}`);
				deleteQuery(content).then(() => {
					navigation.navigate(Screens.GUIDE_ME);
				})
				
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
				navigation.navigate(Screens.QUERY_CREATE,{
					formValues:content.data.published
				})
				break;
			case FullViewType.RESPONSE:
				Alert.alert(`this will update the Response ${content.data._id}`);
				break;
		}
	}
    return (
        <Card style={styles.card}>
			<Badge visible size={25} style={[styles.badge,styles[type]]}>{type.toUpperCase()}</Badge>
			<Card.Title title={published?.title} 
				right={(props) => <Options {...props} mode={MenuModes.CRUD} onDelete={onDelete} onEdit={onUpdate}/>}
			/>
			<Card.Content>
				<Text style={{fontSize:20}}>{published?.body}</Text>
				<ImageSelectionContainer defaultValue={published?.media as string[]} readOnly />
				<TagView tags={published?.tags}/>
			</Card.Content>
				<Card.Title title={author?.firstName +' '+ author?.lastName} subtitle={date} left={(props) => renderAvatar(props)}/>
			<Card.Actions style={styles.actions}>
				<QueryStats 
				stats={stats} onComment = {onComment} 
				commentDisabled={commentDisabled} 
				/>
			</Card.Actions>
		</Card>
    )
}

function mapStateToProps(state:IAppState){
	const { queryOpinionState } = state;
	return {
		opinions:queryOpinionState.opinionList
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
export default connector(PostFullView)

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



/* <Card  transparent style={style}>
			<CardItem
				header
			>
				<Left>
					<H2> {published?.title} </H2>
				</Left>
				<Right>
					<Options mode={MenuModes.CRUD}/>
				</Right>
			</CardItem>
			<CardItem cardBody>
				<Left>
				<Body>
                    <Tags
                        initialTags = {tags}
						readonly
						tagTextStyle={{fontSize:20,color:"white"}}
						tagContainerStyle={{backgroundColor:"black",height:40}}
                    />
					<Text> {published?.body} </Text>
				</Body>
				</Left>
				
			</CardItem>
			<CardItem button onPress={headerNav}>
				<Left>
					<Thumbnail small source={author?.displayPicture||placeholder} />
					<Body>
						<Text> {author?.firstName +' '+ author?.lastName} </Text>
						<Text note>{date}</Text>
					</Body>
				</Left>
			</CardItem>
			<CardItem footer bordered style={{ alignItems: "center", height: 50 }}>
				<QueryStats stats={stats} onComment = {onComment} commentDisabled={commentDisabled}/>
			</CardItem>
		</Card> */
