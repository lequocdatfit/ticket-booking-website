import { CREATE_TICKET } from "../actions/types"

export default (state={}, action) => {
  switch(action.type) {
    case CREATE_TICKET:
      return action.payload;
    default:
      return state;
  }
}