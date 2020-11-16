import React from "react";
import { Alert, ViewStyle } from "react-native";
import { Card, CardItem, Text, Left, Body, Thumbnail, H2 } from "native-base";
const placeholder = require("../../../assets/avatar_placeholder.png");
import { QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { IQuery } from "node-rest-objects/dist/data/queries";
import Tags from "react-native-tags";
import reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";

interface QueryViewProps{
    query:RESTObject<IQuery>,
    style?: ViewStyle | Array<ViewStyle> | null;
    headerNav?: () => void,
    itemNav?: () => void
}

const QueryFullView = ({
	query,
	style = null,
	headerNav = () => {
		Alert.alert(`header clicked`);
	},
	itemNav = () => {
		Alert.alert(`item clicked`);
	},
}: QueryViewProps) => {
	const data:IQuery = query.data;
	const { createdAt,author,published,stats }:{createdAt:string,author:IUser,published:IQueryContent,stats:IQueryStats}= data;
	const date = createdAt.split('T')[0] +" "+createdAt.split('T')[1].substring(0,5);
    return (
        <Card style={style}>
			<CardItem
				header
				button
				onPress={headerNav}
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
					<H2> {published?.title} </H2>
                    <Tags
                        initialTags = {published?.tags}
						readonly
						tagTextStyle={{fontSize:10,color:"white"}}
						tagContainerStyle={{backgroundColor:"black",height:20}}
                    />
					<Text> {published?.body} </Text>
				</Body>
			</CardItem>
			<CardItem footer bordered style={{ alignItems: "center", height: 50 }}>
				<QueryStats stats={stats} />
			</CardItem>
		</Card>
    )
}

export default QueryFullView
