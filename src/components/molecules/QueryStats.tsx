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
    onDownVote?: (val:boolean) => void;
    onUpVote?: (val:boolean) => void;
    scoreOnly?:boolean;
    commentDisabled?:boolean
}

export function QueryStats({stats, onComment, onDownVote, onUpVote, scoreOnly=false,commentDisabled=false}: QueryStatsProps) {
    return (
        <Grid >
            <Row style = {{alignItems: 'center'}}>
            
                <VotesAtom scoreOnly={scoreOnly} voteCount={stats.score} onUpVote={onUpVote} onDownVote={onDownVote}/>
            
                <CommentsAtom commentCount = {stats.responseCount} onCommentPress={onComment} commentDisabled={commentDisabled}/>
            
                <ViewsAtom views = {stats.viewCount}/>
            
            </Row>
        </Grid>
    )
}
