import { 
  SEARCH_FLIGHTS, 
  SELECT_FLIGHT, 
  SELECT_SEAT, 
  REMOVE_SEAT, 
  FETCH_AIRPORTS, 
  CREATE_TICKET, 
  SEARCH_RETURN_FLIGHTS,
  SELECT_RETURN_FLIGHT,
  SELECT_RETURN_SEAT,
  REMOVE_RETURN_SEAT
} from "./types";
import Flight from "../api/Flight";
import history from '../history';
import Airport from '../api/Airport';
import {reset} from 'redux-form';

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

export const searchReturnFlights = (query) => {
  return async dispatch => {
    const response = await Flight.get('/flight/search', {
      params: query
    });
    console.log(response);
    dispatch({
      type: SEARCH_RETURN_FLIGHTS,
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

export const selectReturnFlight = (flight) => {
  return {
    type: SELECT_RETURN_FLIGHT,
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

export const selectReturnSeat = (seat) => {
  return {
    type: SELECT_RETURN_SEAT,
    payload: seat
  }
}

export const removeReturnSeat = (seat) => {
  return {
    type: REMOVE_RETURN_SEAT,
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

export const resetAllForm = () => async dispatch => {
  dispatch(reset('passenger'));
}