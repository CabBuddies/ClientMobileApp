import React from "react";
import { Alert, ViewStyle } from "react-native";
import { Card, CardItem, Text, Left, Body, Thumbnail } from "native-base";
const placeholder = require("../../../assets/avatar_placeholder.png");
import { QueryStats, IQueryStats } from "../molecules";

interface QueryPreviewProps {
	username: string;
	time?: string;
	body: any;
	stats: IQueryStats;
	style?: ViewStyle | Array<ViewStyle> | null;
	headerNav?: () => void;
	itemNav?: () => void;
}

const defaultBody = {
	question: "question??",
	desc:
		"Lots of content and lts description containing many words that they wont fit in a line",
};

const defaultStats = {
	votes: 0,
	comments: 0,
	views: 0,
};

export default function QueryPreview({
	username = "user",
	time = new Date().toISOString(),
	body = defaultBody,
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
					<Thumbnail source={placeholder} />
					<Body>
						<Text> {username} </Text>
						<Text note>{time}</Text>
					</Body>
				</Left>
			</CardItem>
			<CardItem cardBody button onPress={itemNav}>
				<Body>
					<Text> {body.question} </Text>
					<Text note> {body.desc} </Text>
				</Body>
			</CardItem>
			<CardItem footer bordered style={{ alignItems: "center", height: 50 }}>
				<QueryStats stats={stats} />
			</CardItem>
		</Card>
	);
}
