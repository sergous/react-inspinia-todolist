import {combineReducers} from 'redux';
import todos from './todos';
import contacts from './contacts';

const rootReducer = combineReducers({
  todos,
  contacts
});

export default rootReducer;
