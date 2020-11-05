import React from "react";
import { Alert, ViewStyle } from "react-native";
import { Card, CardItem, Text, Left, Body, Thumbnail } from "native-base";
const placeholder = require("../../../assets/avatar_placeholder.png");
import { QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";


interface QueryPreviewProps {
	username: IUser;
	time?: string;
	query: IQueryContent;
	stats: IQueryStats;
	style?: ViewStyle | Array<ViewStyle> | null;
	headerNav?: () => void;
	itemNav?: () => void;
}

const defaultBody = {
	_id: "123456",
	title:"title",
	body: "body",
	tags: ["random","random-2","random-3"],
	lastModifiedAt: new Date(),

};

const defaultStats = {
	_id:"123456",
	score: 0,
	commentCount: 0,
	viewCount: 0,
	responseCount: 0,
    followCount: 0,
    upVoteCount: 0,
    downVoteCount: 0,
    spamReportCount: 0,
};

export default function QueryPreview({
	username,
	time = new Date().toISOString(),
	query = defaultBody,
	stats = defaultStats,
	style = null,
	headerNav = () => {
		Alert.alert(`header clicked`);
	},
	itemNav = () => {
		Alert.alert(`item clicked`);
	},
}: QueryPreviewProps) {
	time = time.split("T")[0];
	console.log("username",username);
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
					<Thumbnail source={username.displayPicture||placeholder} />
					<Body>
						<Text> {username.firstName +' '+ username.lastName} </Text>
						<Text note>{time}</Text>
					</Body>
				</Left>
			</CardItem>
			<CardItem cardBody button onPress={itemNav}>
				<Body>
					<Text> {query.title} </Text>
					<Text note> {query.body} </Text>
				</Body>
			</CardItem>
			<CardItem footer bordered style={{ alignItems: "center", height: 50 }}>
				<QueryStats stats={stats} />
			</CardItem>
		</Card>
	);
}
