import { combineReducers } from 'redux';
import authReducer from './authReducer';
import voteReducer from './voteReducer';

export const rootReducer = combineReducers({
    authReducer,
    voteReducer
});
