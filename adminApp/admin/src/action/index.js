import {
  SIGN_IN, 
  SIGN_OUT, 
  REFRESH_TOKEN,
  CREATE_ADMIN, 
  EDIT_ADMIN, 
  FETCH_ADMIN, 
  FETCH_ADMINS,
  DELETE_ADMIN
} from "./type";
import axiosJWT from '../api/axiosJWT';
import store from '../myStore';
import history from '../history';

export const signIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user
  }
};

export const signOut = () => {
  history.push('/login');
  return {
    type: SIGN_OUT
  }
};

export const refreshToken = (accessToken) => {
  return {
    type: REFRESH_TOKEN,
    payload: accessToken
  }
}

export const fetchAdmins =() => async dispatch => {
  const res = await axiosJWT.get('/user?limit=1000', {
    headers: {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_ADMINS,
    payload: res.data
  });
};

export const fetchAdmin = (id) => async dispatch => {
  const res = await axiosJWT.get(`/user/${id}`);
  dispatch({
    type: FETCH_ADMIN,
    payload: res.data
  })
}

export const editAdmin = (id, formValues) => async dispatch => {
  const res = await axiosJWT.patch(`/user/${id}`, formValues);
  dispatch({
    type: EDIT_ADMIN,
    payload: res.data
  });
}

export const deleteAdmin = (adminId) => async dispatch => {
  await axiosJWT.delete(`/user/${adminId}`);
  history.push('/admins');
  dispatch({
    type: DELETE_ADMIN,
    payload: adminId
  })
}