import { SEARCH_FLIGHTS, SELECT_FLIGHT, SELECT_SEAT, REMOVE_SEAT, FETCH_AIRPORTS, CREATE_TICKET } from "./types";
import Flight from "../api/Flight";
import history from '../history';
import axios from 'axios';
import Airport from '../api/Airport';

export const searchFlights = (query) => {
  return async dispatch => {
    const response = await Flight.get('/flight/search', {
      params: query
    });
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

export const fetchAirports = () => async dispatch => {
  const res = await Airport.get('/airport');
  dispatch({
    type: FETCH_AIRPORTS,
    payload: res.data
  });
}

export const createTicket = (ticket) => {
  return {
    type: CREATE_TICKET,
    payload: ticket
  }
}