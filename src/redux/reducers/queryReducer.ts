import { QueryActions } from '../actions/actionTypes'
import {initialState} from './initialState';

export default function queryReducer(state = initialState, action) {

    switch(action.type) {
        case QueryActions.UP_VOTE:
            return state;
        case QueryActions.DOWN_VOTE:
            return state;
        default:
            return state;
    }

}