import * as types from '../actions/actionTypes'
import initialState from './initialState';

export default function voteReducer(state = initialState.votes, action) {

    switch(action.type) {
        case types.UP_VOTE:
            return state = state + 1;
        case types.DOWN_VOTE:
            return state = state - 1;
        default:
            return state;
    }

}