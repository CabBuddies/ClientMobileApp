import React from 'react'
import {VotesAtom} from '../atoms';
import {CommentsAtom} from '../atoms';
import {ViewsAtom} from '../atoms';
import { Grid, Col } from 'react-native-easy-grid'
import {Container, Content} from 'native-base'

export default function QueryStats() {
    return (
        <Grid >
            <Col>
                <VotesAtom />
            </Col>
            <Col>
                <CommentsAtom />
            </Col>
            <Col>
                <ViewsAtom />
            </Col>
        </Grid>
    )
}
