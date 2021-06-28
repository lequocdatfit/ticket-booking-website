import {
  FETCH_AIRPORTS,
  EDIT_AIRPORT,
  FETCH_AIRPORT,
  CREATE_AIRPORT,
  DELETE_AIRPORT
} from '../action/type';

import _ from 'lodash';

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_AIRPORTS:
      return {...state, ..._.mapKeys(action.payload, '_id')};
    case FETCH_AIRPORT:
      return {...state, [action.payload._id]: action.payload};
    case CREATE_AIRPORT:
      return {...state, [action.payload._id]: action.payload};
    case EDIT_AIRPORT:
      return {...state, [action.payload._id]: action.payload};
    case DELETE_AIRPORT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}