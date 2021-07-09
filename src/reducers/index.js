import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import selectedFlight from './SelectedFlightReducer';
import selectedReturnFlight from './selectedReturnFlight';
import flightReducer from "./flightReducer";
import returnFlightReducer from './returnFlightReducer';
import selectedSeat from "./SelectedSeat";
import selectedReturnSeat from './selectedReturnSeat';
import airportReducer from './airportReducer';
import ticketReducer from "./ticketReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  flights: flightReducer,
  returnFlights : returnFlightReducer,
  airports: airportReducer,
  selectedFlight: selectedFlight,
  selectedReturnFlight: selectedReturnFlight,
  selectedSeat: selectedSeat,
  selectedReturnSeat: selectedReturnSeat,
  ticket: ticketReducer,
});