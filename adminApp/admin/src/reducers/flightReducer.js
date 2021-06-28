import {
  FETCH_FLIGHT,
  FETCH_FLIGHTS,
  CREATE_FLIGHT,
  DELETE_FLIGHT,
  EDIT_FLIGHT
} from '../action/type';
import _ from 'lodash';

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_FLIGHTS:
      return {...state, ..._.mapKeys(action.payload, 'flightId')};
    case FETCH_FLIGHT:
      return {...state, [action.payload.flightId] : action.payload};
    case CREATE_FLIGHT:
      return {...state, [action.payload.flightId] : action.payload};
    case EDIT_FLIGHT:
      return {...state, [action.payload.flightId] : action.payload};
    case DELETE_FLIGHT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}