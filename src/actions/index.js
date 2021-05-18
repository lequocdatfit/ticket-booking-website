import { SEARCH_FLIGHTS, SELECT_FLIGHT } from "./types";
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