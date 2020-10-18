import React, { useState, useReducer } from 'react'
import { Text } from 'native-base'
import  CButton  from '../atoms/Button'
import { Grid, Col, Row } from 'react-native-easy-grid';

const ActionType = {
    LIKE: "like",
    DISLIKE: "dislike"
}
export default function VotesAtom({voteCount = 0}) {

    const initialState = {
        votes: voteCount,
        likeColor: "black",
        dislikeColor:"black",
    }
    const reducer = (state,action) => {
        switch(action.type){
            case ActionType.LIKE:
                if(state.likeColor === "black"){
                    return {
                        votes: state.votes+1,
                        likeColor:"deepskyblue",
                        dislikeColor:"black"
                       }
                }   
                else{
                    return {
                        votes: state.votes-1,
                        likeColor:"black",
                        dislikeColor:"black"
                    }
                } 
            case ActionType.DISLIKE:
                if(state.dislikeColor === "black"){
                    return {
                        votes: state.votes-1,
                        likeColor:"black",
                        dislikeColor:"crimson"
                    }
                }
                else{
                    return {
                        votes: state.votes+1,
                        likeColor: "black",
                        dislikeColor:"black"
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
