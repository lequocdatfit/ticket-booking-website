import { SIGN_IN, SIGN_OUT, REFRESH_TOKEN } from "../action/type";

const INITIAL = {
  isSignedIn : false,
  accessToken: null,
  refreshToken: null
}

export default (state= INITIAL, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {...state, isSignedIn: true, ...action.payload};
    case SIGN_OUT:
      return {...state, isSignedIn: false, accessToken: null, refreshToken: null};
    case REFRESH_TOKEN:
      return {...state, accessToken: action.payload };
    default:
      return state;
  }
}