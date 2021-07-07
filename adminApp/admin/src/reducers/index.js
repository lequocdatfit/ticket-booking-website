import { combineReducers } from "redux";
import authReducer from './authReducer';
import admins from './adminReducer';
import { reducer as formReducer } from "redux-form";
import flightReducer from './flightReducer';
import AirlinerReducer from "./AirlinerReducer";
import alert from './alertReducer';
import airportReducer from "./airportReducer";
import bookingReducer from './bookingReducer';

export default combineReducers({
  auth: authReducer,
  admins: admins,
  form: formReducer,
  alert: alert,
  flights: flightReducer,
  airliners: AirlinerReducer,
  airports: airportReducer,
  bookings: bookingReducer,
});