import { SEARCH_FLIGHTS, SELECT_FLIGHT, SELECT_SEAT, REMOVE_SEAT } from "./types";
import Flight from "../api/Flight";
import history from '../history';

export const searchFlights = () => {
  return async dispatch => {
    const response = await Flight.get('/flights');
    console.log(response);
    dispatch({
      type: SEARCH_FLIGHTS,
      payload: response.data
    });
    history.push('/select-flight');
  }
};

export const selectFlight = (flight) => {
  return {
    type: SELECT_FLIGHT,
    payload: flight,
  }
};

export const selectSeat = (seat) => {
  return {
    type: SELECT_SEAT,
    payload: seat
  }
}

export const removeSeat = (seat) => {
  return {
    type: REMOVE_SEAT,
    payload: seat
  }
}