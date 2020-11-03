import { QueryActions } from '../actions/actionTypes'
import initialState from './initialState';

export default function voteReducer(state = initialState.votes, action) {

    switch(action.type) {
        case QueryActions.UP_VOTE:
            return state = state + 1;
        case QueryActions.DOWN_VOTE:
            return state = state - 1;
        default:
            return state;
    }

}