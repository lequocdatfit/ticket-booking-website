import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import selectedFlight from './SelectedFlightReducer';
import flightReducer from "./flightReducer";
import selectedSeat from "./SelectedSeat";
import airportReducer from './airportReducer';
import ticketReducer from "./ticketReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  flights: flightReducer,
  airports: airportReducer,
  selectedFlight: selectedFlight,
  selectedSeat: selectedSeat,
  ticket: ticketReducer
});