import { combineReducers } from "redux";
import authReducer from './authReducer';
import admins from './adminReducer';
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  admins: admins,
  form: formReducer,
});