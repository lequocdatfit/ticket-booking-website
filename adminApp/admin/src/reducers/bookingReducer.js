import {
  CLEAR_BOOKINGS,
  FETCH_BOOKINGS
} from '../action/type';
import _ from 'lodash';

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_BOOKINGS:
      return {..._.mapKeys(action.payload, '_id')};
    case CLEAR_BOOKINGS:
      return {};
    default:
      return state;
  }
}