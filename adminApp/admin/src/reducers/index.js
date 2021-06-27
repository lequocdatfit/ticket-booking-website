import { combineReducers } from "redux";
import authReducer from './authReducer';
import admins from './adminReducer';
import { reducer as formReducer } from "redux-form";
import alert from './alertReducer';

export default combineReducers({
  auth: authReducer,
  admins: admins,
  form: formReducer,
  alert: alert,
});