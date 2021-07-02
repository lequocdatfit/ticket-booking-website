import {
  FETCH_AIRPORTS
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_AIRPORTS:
      return {...state, ..._.mapKeys(action.payload, '_id')};
    default:
      return state
  }
}