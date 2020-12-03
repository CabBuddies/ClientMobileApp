import React from "react";
import { Alert, StyleSheet, ViewStyle } from "react-native";
import { Left, Body, Thumbnail, H1 } from "native-base";
const placeholder = require("../../../assets/avatar_placeholder.png");
import { QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { IQuery } from "node-rest-objects/dist/data/queries";
import reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { Avatar, Colors, Card, Paragraph } from "react-native-paper";
import { Options } from "../atoms";
import { MenuModes } from "../../definitions/common-definitions";
import { timeSince } from "../../utils/Helpers";


interface QueryPreviewProps {
	
	query:IQuery
	style?: ViewStyle | Array<ViewStyle> | null;
	headerNav?: () => void;
	itemNav?: () => void;
}



function randBetween(a,b){
	return Math.floor(Math.random() * b) + a  ;
}

export default function QueryPreview({
	query,
	style = null,
	headerNav = () => {
		Alert.alert(`header clicked`);
	},
	itemNav = () => {
		Alert.alert(`item clicked`);
	},
}: QueryPreviewProps) {
	const { createdAt,author,published,stats }:{createdAt:string,author:IUser,published:IQueryContent,stats:IQueryStats} = query;

	const date:string = timeSince(new Date(createdAt))||(createdAt.split('T')[0] +" "+createdAt.split('T')[1].substring(0,5));

	const renderAvatar = (props) => {
		if(author?.displayPicture){
			const uri = author?.displayPicture;
			return <Avatar.Image {...props} source={{uri:uri}} />
		}
		else{
			const text = author?.firstName.charAt(0)+author?.lastName.charAt(0);
			return <Avatar.Text {...props} style={{backgroundColor:Colors.blueA700}} label={text} />
		}
	} 
	return (
		<Card elevation={3} onPress={itemNav} style={styles.card}>
			<Card.Title title={published?.title} right={(props) => <Options {...props} mode={MenuModes.CRUD}/>}/>
			<Card.Title title={author?.firstName +' '+ author?.lastName} subtitle={""} left={(props) => renderAvatar(props)}/>
			<Card.Actions style={styles.actions}>
				<QueryStats stats={stats} onComment = {() => Alert.alert(`open the query to comment`)} scoreOnly/>
			</Card.Actions>
		</Card>
	);
}

const styles=StyleSheet.create({
	actions:{
		borderWidth:0.5,
		borderColor:Colors.black
	},
	card:{
		borderWidth:0.25,
		borderColor:Colors.black
	}
})





// const defaultAuthor:IUser = {
	//         _id: "123456",
	//         userId:"123456",
	//         firstName:"anonymous",
	//         lastName:"user",
	//         email:"anonymous",
	//         displayPicture:""
		
	// }
	
	// const defaultBody = {
	// 	_id: "123456",
	// 	title:"title",
	// 	body: "body",
	// 	tags: ["random","random-2","random-3"],
	// 	lastModifiedAt: new Date(),
	
	// };
	
	// const defaultStats = {
	// 	_id:"123456",
	// 	score: 0,
	// 	commentCount: 0,
	// 	viewCount: 0,
	// 	responseCount: 0,
	//     followCount: 0,
	//     upVoteCount: 0,
	//     downVoteCount: 0,
	//     spamReportCount: 0,
	// };
	
	// const defaultQuery:IQuery = {
	// 	_id:"452u423",
	// 	author:defaultAuthor,
	// 	published:defaultBody,
	// 	draft: defaultBody,
	// 	createdAt: new Date(),
	// 	status: "published",
	// 	stats: defaultStats,
	// 	access:{type:"",users:[]},
	// 	customAttributes:{}
	// }