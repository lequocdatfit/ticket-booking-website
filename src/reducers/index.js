import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import selectedFlight from './SelectedFlightReducer';
import flightReducer from "./flightReducer";
import selectedSeat from "./SelectedSeat";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  flights: flightReducer,
  selectedFlight: selectedFlight,
  selectedSeat: selectedSeat
});