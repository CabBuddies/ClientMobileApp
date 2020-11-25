import React from "react";
import { Alert, StyleSheet, ViewStyle } from "react-native";
import {Text, Left, Body, Thumbnail, H2, Right } from "native-base";
const placeholder = require("../../../assets/avatar_placeholder.png");
import { QueryStats } from "../molecules";
import { IQueryContent, IQueryStats } from "../../definitions/query-definitions";
import { IUser } from "node-rest-objects/dist/data/user-management";
import { IQuery, IResponse } from "node-rest-objects/dist/data/queries";
import { Avatar, Card, Chip, Colors, Paragraph } from "react-native-paper"; 
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
        <Card>
			<Card.Title title={published?.title} right={(props) => <Options {...props} mode={MenuModes.CRUD}/>}/>
			<Card.Content>
				<Tags
					initialTags = {tags}
					readonly
					containerStyle={styles.tagContainer}
					renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
						<Chip key={`${tag}-${index}`} onPress={onPress} 
							style={[styles.tag, (type!==FullViewType.QUERY)?styles.responseTag:styles.queryTag]} 
							textStyle={styles.tagText}
						>
						  {tag}
						</Chip>
					  )}
                />
				<Paragraph>{published?.body}</Paragraph>
			</Card.Content>
				<Card.Title title={author?.firstName +' '+ author?.lastName} subtitle={date} left={(props) => renderAvatar(props)}/>
			<Card.Actions>
				<QueryStats stats={stats} onComment = {onComment} commentDisabled={commentDisabled}/>
			</Card.Actions>
		</Card>
    )
}

export default PostFullView

const styles = StyleSheet.create({
	tagContainer:{
		justifyContent:"space-evenly",
		padding:2
	},
	tag:{
		justifyContent:"center",
	},
	queryTag:{
		backgroundColor:Colors.blueA700,
	},
	responseTag:{
		backgroundColor:Colors.green600,
	},
	tagText:{
		fontSize:12,
		color:Colors.white
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
