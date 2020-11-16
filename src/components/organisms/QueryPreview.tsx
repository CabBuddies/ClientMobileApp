import React from "react";
import { Alert, ViewStyle } from "react-native";
import { Card, CardItem, Text, Left, Body, Thumbnail, H1 } from "native-base";
const placeholder = require("../../../assets/avatar_placeholder.png");
import { QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { IQuery } from "node-rest-objects/dist/data/queries";
import reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";


interface QueryPreviewProps {
	
	query:RESTObject<IQuery>
	style?: ViewStyle | Array<ViewStyle> | null;
	headerNav?: () => void;
	itemNav?: () => void;
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
	const { createdAt,author,published,stats }:{createdAt:string,author:IUser,published:IQueryContent,stats:IQueryStats} = query.data;
	const date:string = createdAt.split('T')[0] +" "+createdAt.split('T')[1].substring(0,5);
	return (
		<Card style={style}>
			<CardItem
				header
				button
				onPress={() => {
					headerNav;
				}}
			>
				<Left>
					<Thumbnail source={author?.displayPicture||placeholder} />
					<Body>
						<Text> {author?.firstName +' '+ author?.lastName} </Text>
						<Text note>{date}</Text>
					</Body>
				</Left>
			</CardItem>
			<CardItem cardBody button onPress={itemNav}>
				<Body>
					<H1> {published?.title} </H1>
				</Body>
			</CardItem>
			{/* <CardItem footer bordered style={{ alignItems: "center", height: 50 }}>
				<QueryStats stats={stats} />
			</CardItem> */}
		</Card>
	);
}






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