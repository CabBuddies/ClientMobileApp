import React from 'react'
import {VotesAtom} from '../atoms';
import {CommentsAtom} from '../atoms';
import {ViewsAtom} from '../atoms';
import { Grid, Col, Row } from 'react-native-easy-grid';
import {Container, Content} from 'native-base';

export interface IQueryStats{
    votes: number;
    comments: number;
    views: number;
}
interface QueryStatsProps{
    stats: IQueryStats;
}

export function QueryStats({stats}: QueryStatsProps) {
    return (
        <Grid >
            <Row style = {{alignItems: 'center'}}>
            
                <VotesAtom voteCount = {stats.votes}/>
            
                <CommentsAtom commentCount = {stats.comments}/>
            
                <ViewsAtom views = {stats.views}/>
            
            </Row>
        </Grid>
    )
}
