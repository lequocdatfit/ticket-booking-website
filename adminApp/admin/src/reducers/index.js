import { combineReducers } from "redux";
import authReducer from './authReducer';
import admins from './adminReducer';

export default combineReducers({
  auth: authReducer,
  admins: admins,
});