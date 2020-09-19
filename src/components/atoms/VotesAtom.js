import React, {useState} from 'react'
import { Text } from 'native-base'
import { CButton } from '../atoms'
import { Grid, Col, Row } from 'react-native-easy-grid';

export default function VotesAtom({voteCount = 0}) {
    console.log(`VotesAtom => voteCount: ${voteCount}`)
    // const votesCount = voteCount;
    const [votes,setVotes] = useState(voteCount);
    return (
        <Grid>
            <Row style ={{alignItems: 'center'}}>
            <CButton
                transparent
                hasIcon iconOnly
                container = {{flex:0}}
                icon = "md-arrow-up"
                onPress={()=>setVotes(prevVotes => prevVotes+1)}
                />      
                   
                <Text> {votes} </Text> 
           
                <CButton
                transparent
                hasIcon iconOnly
                container = {{flex:0}}
                icon = "md-arrow-down"
                onPress={()=>setVotes(prevVotes => prevVotes-1)}
                />  
            
            </Row>
        </Grid>
    )
}
