import {
  SIGN_IN, 
  SIGN_OUT, 
  REFRESH_TOKEN,
  CREATE_ADMIN, 
  EDIT_ADMIN, 
  FETCH_ADMIN, 
  FETCH_ADMINS,
  DELETE_ADMIN,
  SHOW_ALERT,
  HIDE_ALERT,

  CREATE_FLIGHT,
  FETCH_FLIGHTS,
  FETCH_FLIGHT,
  EDIT_FLIGHT,
  DELETE_FLIGHT,
  FETCH_AIRLINERS,
  FETCH_AIRPORTS
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
  console.log(res);
  dispatch({
    type: FETCH_ADMINS,
    payload: res.data
  });
};

export const fetchAdmin = (id) => async dispatch => {
  const res = await axiosJWT.get(`/user/${id}`, {
    headers: {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_ADMIN,
    payload: res.data
  })
}

export const createAdmin = (formValues) => async dispatch => {
  let res;
  try {
    res = await axiosJWT.post('/user/add/admin', formValues, {
      headers: {
        authorization: 'Bearer ' + store.getState().auth.accessToken
      }
    });
    if(res.status === 201) {
      dispatch({
        type: CREATE_ADMIN,
        payload: res.data
      });
      dispatch(showAlert('Create admin success!', 'success'));
      setTimeout(() => {
        dispatch(hideAlert())
      }, 5000);
      history.push('/admins');
    }
  }
  catch(err) {
    console.log(err.response.data.error);
    dispatch(showAlert(err.response.data.error, 'error'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
  }
} 

export const editAdmin = (id, formValues) => async dispatch => {
  let res;
  try {
    res = await axiosJWT.patch(`/user/${id}`, formValues, {
      headers: {
        authorization: 'Bearer ' + store.getState().auth.accessToken
      }
    });
    dispatch({
      type: EDIT_ADMIN,
      payload: res.data
    });

    dispatch(showAlert('Edit admin success!', 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
    
  } catch(err) {
    dispatch(showAlert(err.response.data, 'error'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
  }
}

export const deleteAdmin = (adminId) => async dispatch => {
  await axiosJWT.delete(`/user/${adminId}`, {
    headers: {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  history.push('/admins');
  dispatch({
    type: DELETE_ADMIN,
    payload: adminId
  })
}

export const showAlert = (message, type) => {
  return {
    type: SHOW_ALERT,
    payload: {message: message, type: type}
  }
}

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  }
}

const flashAlert = (message) => dispatch => {
  dispatch(showAlert(message));
  setTimeout(() => {
    dispatch(hideAlert())
  }, 5000);
}

export const fetchFLights = () => async dispatch => {
  const res = await axiosJWT.get('/flight/', {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_FLIGHTS,
    payload: res.data
  });
}


export const fetchAirliners = () => async dispatch => {
  const res = await axiosJWT.get('/airliner',  {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_AIRLINERS,
    payload: res.data
  });
}

export const fetchAirports = () => async dispatch => {
  const res = await axiosJWT.get('/airport', {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_AIRPORTS,
    payload: res.data
  })
}