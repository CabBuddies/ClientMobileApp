import React from "react";
import { Alert, StyleSheet, ViewStyle } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../definitions/screen-definitions";

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

const PostFullView = ({ type = FullViewType.QUERY, content,style = null,
	onComment = () => Alert.alert(`happy commenting`),
	commentDisabled=false,
	headerNav = () => Alert.alert(`header clicked`),
	itemNav = () => Alert.alert(`this will trigger an update`)}: QueryViewProps
	) => {
	
	const navigation = useNavigation();
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
	const onDelete = () => {
		switch(type){
			case FullViewType.QUERY:
				Alert.alert(`this will delete the query ${content.data._id}`);
				navigation.navigate(Screens.GUIDE_ME);
				break;
			case FullViewType.RESPONSE:
				Alert.alert(`this will delete the Response ${content.data._id}`);
				break;
		}
	}
	const onUpdate = () => {
		switch(type){
			case FullViewType.QUERY:
				Alert.alert(`this will update the query ${content.data._id}`);
				break;
			case FullViewType.RESPONSE:
				Alert.alert(`this will update the Response ${content.data._id}`);
				break;
		}
	}
    return (
        <Card style={styles.card}>
			<Card.Title title={published?.title} 
				right={(props) => <Options {...props} mode={MenuModes.CRUD} onDelete={onDelete} onEdit={onUpdate}/>}
			/>
			<Card.Content>
				<Tags
					initialTags = {tags}
					readonly
					containerStyle={styles.tagContainer}
					onTagPress={(index,tagLabel) => reactotron.log!(`${tagLabel} pressed`)}
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
			<Card.Actions style={styles.actions}>
				<QueryStats stats={stats} onComment = {onComment} commentDisabled={commentDisabled}/>
			</Card.Actions>
		</Card>
    )
}

export default PostFullView

const styles = StyleSheet.create({
	card:{
		borderTopWidth:0.5,
		borderTopColor:Colors.black,
	},
	actions:{
		borderWidth:0.5,
		borderColor:Colors.black
	},
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
