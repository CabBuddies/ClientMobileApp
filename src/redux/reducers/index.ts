import { combineReducers } from 'redux';
import authReducer from './authReducer';
import queryReducer from './queryReducer';

export const rootReducer = combineReducers({
    authState : authReducer,
    queryState : queryReducer
});
