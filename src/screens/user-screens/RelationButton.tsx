import { IUser, UserRelation } from 'node-rest-objects/dist/data/user-management';
import React, { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper';
import { UserDetailsPreview } from '../../components/molecules'
import RelationsTopTabNavigator from '../../navigations/RelationsNavigator';
import { getRelation,sendFollowRequest,unfollowUser } from '../../api/user-relation-api';
import { Colors } from 'react-native-paper';
import reactotron from '../../../dev/ReactotronConfig';

/**
 * (Bottom sheet || Modal Screen) to show the view of a user
 */
export default function RelationButton({ user ,isSelf, onEdit, signOut,openChat=()=>{}}) {
    const name = user.firstName + ' ' + user.lastName;

    const [relation,setRelation] = React.useState<UserRelation|null>(null);

    const loadRelation = ()=>{
        getRelation(user.userId).then((result)=>{
            if(result)
                setRelation(result);
        }).catch((error)=>{
            console.error(error);
        })
    }

    useEffect(() => {
        if(!isSelf)
            loadRelation();
    }, []);

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: name
    //     })
    // }, [navigation]);

    let followUser=()=>{
        sendFollowRequest(user.userId).then((result)=>{
            console.log(result);
            setRelation(result);
        }).catch((error)=>{
            console.error(error);
        })
    };

    const deleteRelation = ()=>{
        if(relation){
            unfollowUser(relation.data.followeeId.userId,relation.data._id).then((result)=>{
                console.log(result);
                setRelation(null);
            }).catch((error)=>{
                console.error(error);
            })
        }
    };

    // accepted, requested, rejected, blocked

    const extractStyles = (borderWidth:number,borderStyle:string,borderColor:string,backgroundColor?:string)=>{
        //backgroundColor = backgroundColor || borderColor;
        return {borderWidth,borderStyle,borderColor,backgroundColor}
    }

    const buttonMap:{[key:string]:{label:string,op:Function,enabled:boolean,style:any,mode:"text"|"outlined"|"contained"}}={
        "updateBtn":{
            label:"Edit Profile",
            op:onEdit,
            enabled:true,
            style:{
                btn:{
                    //blue fill
                    //blue border
                    ...extractStyles(2,'solid',Colors.blue500,Colors.blue500) 
                },
                text:{
                    //white
                    color:Colors.white
                }
            },
            mode:"contained"
        },
        "accepted":{
            label:"Following",
            op:deleteRelation,
            enabled:true,
            style:{
                btn:{
                    //blue fill
                    //blue border
                    ...extractStyles(2,'solid',Colors.blue500,Colors.blue500) 
                },
                text:{
                    //white
                    color:Colors.white
                }
            },
            mode:"contained"
        },
        "requested":{
            label:"Cancel Request",
            op:deleteRelation,
            enabled:true,
            style:{
                btn:{
                    //red border
                    ...extractStyles(2,'solid',Colors.red200) 
                    //transparent fill
                },
                text:{
                    //red
                    color:Colors.red200
                }
            },
            mode:"outlined"
        },
        "blocked":{
            label:"Can't Follow",
            op:()=>{},
            enabled:false,
            style:{
                btn:{
                    //black fill
                    //black border
                    ...extractStyles(2,'solid',Colors.black,Colors.black)
                },
                text:{
                    //text
                    colors:Colors.black
                }
            },
            mode:"contained"
        },
        "rejected":{
            label:"Follow Again",
            op:followUser,
            enabled:true,
            style:{
                btn:{
                    //dull blue fill
                    //dull blue border
                    ...extractStyles(2,'solid',Colors.blue200)
                },
                text:{
                    //dull bull
                    color:Colors.blue200
                }
            },
            mode:"outlined"
        },
        "notfound":{
            label:"Follow",
            op:followUser,
            enabled:true,
            style:{
                btn:{
                    //blue fill
                    //blue border
                    ...extractStyles(2,'solid',Colors.blue500)
                },
                text:{
                    //bull
                    color:Colors.blue500
                }
            },
            mode:"outlined"
        }
    };

    const buttonStatus = isSelf?'updateBtn':(relation?relation.data.status:'notfound');

    const buttonState = buttonMap[buttonStatus];

    reactotron.log!(buttonState);

    return (
        <View style={styles.container}>
            <Button style={{...styles.baseStyle,...buttonState.style.btn}} labelStyle={buttonState.style.text} mode={buttonState.mode} onPress={()=>{buttonState.op()}} disabled={!buttonState.enabled}>{buttonState.label}</Button>
            { isSelf ? <Button onPress={signOut}>
                Sign Out
                </Button>:
                <Button onPress={openChat}>Message</Button>
                }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    },
    baseStyle:{
        width:"50%", 
        borderRadius:40
    },
    followStyle:{
        backgroundColor:Colors.blue600
    },
    negativeButton:{
        backgroundColor:Colors.red500
    },
    neutralButton:{
        backgroundColor:Colors.grey50
    },
    textDark:{
        color:Colors.black
    },
    textLight:{
        color:Colors.white
    }
});
