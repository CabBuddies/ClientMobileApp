import React from "react";
import { Alert, ViewStyle } from "react-native";
import { Card, CardItem, Text, Left, Body, Thumbnail, H2, Right } from "native-base";
const placeholder = require("../../../assets/avatar_placeholder.png");
import { QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { IQuery, IResponse } from "node-rest-objects/dist/data/queries";
import Tags from "react-native-tags";
import { Options } from "../atoms";
import reactotron from "../../../dev/ReactotronConfig";
import RESTObject from "node-rest-objects/dist/rest/rest.object";
import { FullViewType, MenuModes } from "../../definitions/common-definitions";

type T = any
interface QueryViewProps{
	type:FullViewType
    content:RESTObject<T> ,
	style?: ViewStyle | Array<ViewStyle> | null;
	onComment?:any,
	commentDisabled?:any;
    headerNav?: () => void,
    itemNav?: () => void
}



const PostFullView = ({
	type = FullViewType.QUERY,
	content,
	style = null,
	onComment = () => {
		Alert.alert(`happy commenting`);
	},
	commentDisabled=false,
	headerNav = () => {
		Alert.alert(`header clicked`);
	},
	itemNav = () => {
		Alert.alert(`this will trigger an update`);
	},
}: QueryViewProps) => {
	const data:IQuery|IResponse = content.data;
	const { createdAt,author,published,stats }:{createdAt:string,author:IUser,published:IQueryContent,stats:IQueryStats}= data;
	const date = createdAt.split('T')[0] +" "+createdAt.split('T')[1].substring(0,5);
	const generateTags = () => {
		switch(type){
			case FullViewType.QUERY:
				return published?.tags;
			case FullViewType.RESPONSE:
				return ["RESPONSE"];
		}
	}
	let tags = generateTags();

    return (
        <Card  transparent style={style}>
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
		</Card>
    )
}

export default PostFullView
