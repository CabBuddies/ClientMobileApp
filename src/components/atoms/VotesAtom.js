import React, { useState, useReducer } from 'react'
import { StyleSheet } from "react-native";
import { Text } from 'native-base'
import  CButton  from '../atoms/Button'
import { Grid, Col, Row } from 'react-native-easy-grid';

const Colors = {
    LIKE: "mediumblue",
    DISLIKE: "crimson",
    DEFAULT: "black"
}
const ActionType = {
    LIKE: "like",
    DISLIKE: "dislike"
}
export default function VotesAtom({voteCount = 0}) {

    const initialState = {
        votes: voteCount,
        likeColor: Colors.DEFAULT,
        dislikeColor:Colors.DEFAULT,
    }
    const reducer = (state,action) => {
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

