import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    dummy: x => x || {}
});

export default rootReducer;