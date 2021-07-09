import { SEARCH_RETURN_FLIGHTS } from "../actions/types";
import _ from 'lodash';

export default (state={}, action) => {
  switch(action.type) {
    case SEARCH_RETURN_FLIGHTS: 
      return {..._.mapKeys(action.payload, 'flightId')};
    default:  
      return state;
  } 
};