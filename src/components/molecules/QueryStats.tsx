import React from 'react'
import {VotesAtom} from '../atoms';
import {CommentsAtom} from '../atoms';
import {ViewsAtom} from '../atoms';
import { Grid, Col, Row } from 'react-native-easy-grid';
import {Container, Content} from 'native-base';
import { IQueryStats } from '../../definitions/query-definitions';


interface QueryStatsProps{
    stats: IQueryStats;
    onComment?: () => void;
    onOpinion?: () => void;
}

export function QueryStats({stats, onComment, onOpinion}: QueryStatsProps) {
    return (
        <Grid >
            <Row style = {{alignItems: 'center'}}>
            
                <VotesAtom voteCount = {stats.score}/>
            
                <CommentsAtom commentCount = {stats.commentCount} onCommentPress={onComment}/>
            
                <ViewsAtom views = {stats.viewCount}/>
            
            </Row>
        </Grid>
    )
}
