import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import queryReducer from './query-reducer';
import queryListReducer from './query-list-reducer';
import userReducer from './user-reducer';

export const rootReducer = combineReducers({
    authState : authReducer,
    userState: userReducer,
    queryListState:queryListReducer,
    queryState : queryReducer
});
