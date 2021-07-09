import { SELECT_RETURN_FLIGHT } from "../actions/types"

export default (state=null, action) => {
  switch(action.type) {
    case SELECT_RETURN_FLIGHT:
      return action.payload
    default:
      return state;
  }
}