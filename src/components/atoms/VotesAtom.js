import React, {useState} from 'react'
import { Text, View } from 'native-base'
import { CButton as Button } from './'
import { Grid, Col } from 'react-native-easy-grid';

export default function VotesAtom() {

    const [votes,setVotes] = useState(0);

    return (
        <>
                <Button
                    transparent
                    hasIcon
                    title = {votes}
                    icon="md-arrow-up"
                    onPress={() => {
                        setVotes(prevCount => prevCount+1);
                    }}
                />
            

                <Button
                    transparent 
                    hasIcon
                    iconOnly
                    icon="md-arrow-down"
                    onPress={() => {
                        setVotes(prevCount => prevCount-1)
                    }}
                />
        </>
    )
}
