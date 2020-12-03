import React, { useState, useReducer } from 'react'
import { StyleSheet } from "react-native";
import { Text } from 'native-base'
import  CButton  from './Button'
import { Grid, Col, Row } from 'react-native-easy-grid';

export default function VotesAtom({voteCount = 0,upVoted=false,downVoted=false,scoreOnly=false, onUpVote = (val:boolean) => {}, onDownVote = (val:boolean) => {}}) {
    
   const[isUpVoted,setIsUpVoted] = useState(upVoted);
   const [isDownVoted,setIsDownVoted] = useState(downVoted); 
    const text = (scoreOnly)?"score: ":"";
    const upVoteAction = () => {
        setIsUpVoted(!isUpVoted);
        setIsDownVoted(false);
        onUpVote(isUpVoted);
    }
    const downVoteAction = () => {
        setIsDownVoted(!isDownVoted);
        setIsUpVoted(false);
        onDownVote(isDownVoted);
    }
    return (
        <Grid>
            <Row style ={{alignItems: 'center'}}>
            {
                !scoreOnly && 
                <CButton
                transparent
                hasIcon iconOnly
                container = {{flex:0}}
                icon = "md-arrow-up"
                iconStyle = {{color:(isUpVoted)?"mediumblue":"black"}}
                onPress={upVoteAction}
                />   
            }
                 
                <Text> {text+voteCount} </Text> 
           {
               !scoreOnly && 
               <CButton
               transparent
               hasIcon iconOnly
               container = {{flex:0}}
               icon = "md-arrow-down"
               onPress={downVoteAction}
               iconStyle = {{color:(isDownVoted)?"red":"black"}}
               />
           }
            </Row>
        </Grid>
    )
}

