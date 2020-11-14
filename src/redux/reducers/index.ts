import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import queryReducer from './query-reducer';
import queryListReducer from './query-list-reducer';

export const rootReducer = combineReducers({
    authState : authReducer,
    queryListState:queryListReducer,
    queryState : queryReducer
});
