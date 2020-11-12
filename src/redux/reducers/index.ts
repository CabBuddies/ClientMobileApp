import { combineReducers } from 'redux';
import authReducer from './authReducer';
import queryReducer from './queryReducer';
import queryListReducer from './query-list-reducer';

export const rootReducer = combineReducers({
    authState : authReducer,
    queryListState:queryListReducer,
    queryState : queryReducer
});
