import { SIGN_IN, SIGN_OUT } from "../action/type";

const INITIAL = {
  isSignedIn : false,
  user: null,
}

export default (state= INITIAL, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {...state, isSignedIn: true, user: action.payload}
    case SIGN_OUT:
      return {...state, isSignedIn: false, user: null}
    default:
      return state;
  }
}