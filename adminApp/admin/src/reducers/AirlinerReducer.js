import {
  FETCH_AIRLINER,
  EDIT_AIRLINER,
  CREATE_AIRLINER,
  FETCH_AIRLINERS,
  DELETE_AIRLINER,
} from '../action/type';
import _ from 'lodash';

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_AIRLINERS:
      return {...state, ..._.mapKeys(action.payload, '_id')};
    case FETCH_AIRLINER:
      return {...state, [action.payload._id]: action.payload};
    case CREATE_AIRLINER: 
      return {...state, [action.payload._id]: action.payload};
    case EDIT_AIRLINER:
      return {...state, [action.payload._id]: action.payload};
    case DELETE_AIRLINER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}