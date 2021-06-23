import { SELECT_FLIGHT } from "../actions/types"

export default (state=null, action) => {
  switch(action.type) {
    case SELECT_FLIGHT:
      return action.payload
    default:
      return state;
  }
}