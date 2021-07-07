import {
  CLEAR_BOOKINGS,
  FETCH_BOOKINGS,
  DELETE_BOOKING
} from '../action/type';
import _ from 'lodash';

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_BOOKINGS:
      return {..._.mapKeys(action.payload, '_id')};
    case CLEAR_BOOKINGS:
      return {};
    case DELETE_BOOKING:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}