import React from "react";
import { Alert, ViewStyle } from "react-native";
import { Card, CardItem, Text, Left, Body, Thumbnail, H2, Right } from "native-base";
const placeholder = require("../../../assets/avatar_placeholder.png");
import { QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { IQuery } from "node-rest-objects/dist/data/queries";
import Tags from "react-native-tags";
import { Options } from "../atoms";
import reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";

type T = any
interface QueryViewProps{
    query:RESTObject<T> ,
	style?: ViewStyle | Array<ViewStyle> | null;
	onComment?:any,
    headerNav?: () => void,
    itemNav?: () => void
}

const QueryFullView = ({
	query,
	style = null,
	onComment = () => {
		Alert.alert(`happy commenting`);
	}, 
	headerNav = () => {
		Alert.alert(`header clicked`);
	},
	itemNav = () => {
		Alert.alert(`this will trigger an update`);
	},
}: QueryViewProps) => {
	const data:IQuery = query.data;
	const { createdAt,author,published,stats }:{createdAt:string,author:IUser,published:IQueryContent,stats:IQueryStats}= data;
	const date = createdAt.split('T')[0] +" "+createdAt.split('T')[1].substring(0,5);
    return (
        <Card  transparent style={style}>
			<CardItem
				header
			>
				<H2> {published?.title} </H2>
			</CardItem>
			<CardItem cardBody button onLongPress={() => Options()}>
				<Left>
				<Body>
                    <Tags
                        initialTags = {published?.tags}
						readonly
						tagTextStyle={{fontSize:10,color:"white"}}
						tagContainerStyle={{backgroundColor:"black",height:20}}
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
				<QueryStats stats={stats} onComment = {onComment}/>
			</CardItem>
		</Card>
    )
}

export default QueryFullView
