import React, { useState, useReducer } from 'react'
import { StyleSheet } from "react-native";
import { Text } from 'native-base'
import  CButton  from './Button'
import { Grid, Col, Row } from 'react-native-easy-grid';

enum Colors {
    LIKE = "mediumblue",
    DISLIKE ="crimson",
    DEFAULT = "black"
}
enum ActionType{
    LIKE = "like",
    DISLIKE = "dislike"
}
export interface Votes{
    votes: number;
    likeColor: Colors;
    dislikeColor: Colors;
}
interface Actions{
    type: ActionType;
}
export default function VotesAtom({voteCount = 0}) {

    const initialState = {
        votes: voteCount,
        likeColor: Colors.DEFAULT,
        dislikeColor:Colors.DEFAULT,
    }
    const reducer = (state: Votes,action:Actions) => {
        switch(action.type){
            case ActionType.LIKE:
                if(state.likeColor === "black"){
                    return {
                        votes: state.votes+1,
                        likeColor:Colors.LIKE,
                        dislikeColor:Colors.DEFAULT
                       }
                }   
                else{
                    return {
                        votes: state.votes-1,
                        likeColor:Colors.DEFAULT,
                        dislikeColor:Colors.DEFAULT
                    }
                } 
            case ActionType.DISLIKE:
                if(state.dislikeColor === "black"){
                    return {
                        votes: state.votes-1,
                        likeColor:Colors.DEFAULT,
                        dislikeColor:Colors.DISLIKE
                    }
                }
                else{
                    return {
                        votes: state.votes+1,
                        likeColor: Colors.DEFAULT,
                        dislikeColor:Colors.DEFAULT
                    }
                }
        }
    };
    const [votesState,dispatch] = useReducer(reducer,initialState);
    return (
        <Grid>
            <Row style ={{alignItems: 'center'}}>
            <CButton
                transparent
                hasIcon iconOnly
                container = {{flex:0}}
                icon = "md-arrow-up"
                iconStyle = {{color:votesState.likeColor}}
                onPress={()=>{
                    dispatch({type: ActionType.LIKE})
                }}
                />      
                   
                <Text> {votesState.votes} </Text> 
           
                <CButton
                transparent
                hasIcon iconOnly
                container = {{flex:0}}
                icon = "md-arrow-down"
                onPress={()=>dispatch({type:ActionType.DISLIKE})}
                iconStyle = {{color:votesState.dislikeColor}}
                />  
            
            </Row>
        </Grid>
    )
}

