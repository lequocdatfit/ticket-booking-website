import { REMOVE_RETURN_SEAT, SELECT_RETURN_SEAT } from "../actions/types";
import _ from 'lodash';

export default (state={}, action) => {
  switch(action.type) {
    case SELECT_RETURN_SEAT:
      return {...state, [action.payload.id] : action.payload}
    case REMOVE_RETURN_SEAT:
      return _.omit(state, action.payload.id);
    default:
      return state;
  }
}