import { Icon } from 'native-base';
import { Group, IGroup } from 'node-rest-objects/dist/data/groups';
import { IUser, User } from 'node-rest-objects/dist/data/user-management';
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native';
import { Card, Button as PaperButton, TouchableRipple, Headline, Avatar, Text, IconButton } from 'react-native-paper';
import { CustomAvatar } from '../molecules';
import { Row, Col, Grid } from 'react-native-easy-grid';

interface ISimpleCardProps {
    content?: User | Group;
    title?: string;
    subTitle?: string;
    actionTitle?: string;
    action?: () => void;
    onPress?: () => void;
    avatarSize?: number
}

const SimpleCard = ({
    content, title = "Full Name", subTitle = "subtitle",
    actionTitle = "action", action,
    onPress = () => Alert.alert('Card Pressed'), avatarSize = 24 }: ISimpleCardProps) => {
    let data: IUser | IGroup;
    if (content instanceof User) {
        data = content.data;
        title = data.firstName + ' ' + data.lastName;
        subTitle = data.email;
    }
    else if (content instanceof Group) {
        data = content.data
        title = data.title
        const [si, m] = data.description.split(',');
        // calendar-clock, 
        // account-group,
        // ray-start-arrow



        return (
            <Card onPress={onPress} elevation={3} style={{ margin: 10 }} >
                <Card.Cover source={{ uri: data.displayPicture }} />
                <Card.Content>
                    <Headline style={{fontWeight:'bold',justifyContent:'center',textAlign:'center'}}>{title}</Headline>
                    <View style={styles.cityContainer}>
                        <Text style={styles.text}>{data.plan.origin.place.address.city}</Text>
                        <Icon type="MaterialCommunityIcons" name="ray-start-arrow" style={styles.icon} />
                        <Text style={styles.text}>{data.plan.destination.place.address.city}</Text>
                    </View>
                    <View>
                        <Row>
                            <Col >
                                <Row style={{alignItems:'center',justifyContent:'flex-start'}}>
                                    {/* <Col> */}
                                        <Icon type="MaterialCommunityIcons" name="calendar-clock" />
                                    {/* </Col>
                                    <Col> */}
                                        <Text style={styles.stext}>{si}</Text>
                                </Row>
                            </Col>
                            <Col >
                                <Row style={{alignItems:'center',justifyContent:'flex-end'}} >
                                    {/* <Col> */}
                                        <Text style={styles.stext}>{m}</Text>
                                    {/* </Col>
                                    <Col> */}
                                        <Icon type="MaterialCommunityIcons" name="account-group" />
                                    {/* </Col> */}
                                </Row>
                            </Col>
                        </Row>
                    </View>
                </Card.Content>
            </Card>
        )
    }

    return (
        <TouchableRipple>
            <Card onPress={onPress} elevation={3}>
                <Card.Title
                    title={title}
                    subtitle={subTitle}
                    left={() => (data && <CustomAvatar size={avatarSize} data={data} />)}
                    right={() => (action && <PaperButton mode="contained" onPress={action}>{actionTitle}</PaperButton>)}
                />
            </Card>
        </TouchableRipple>
    )


}

export default SimpleCard;

const styles = StyleSheet.create({
    cityContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical:10
    },
    icon: { backgroundColor: 'transparent' },
    text: {
        fontSize: 20,
    },
    stext: {
        fontSize: 18,
        paddingHorizontal:5
    }
})
