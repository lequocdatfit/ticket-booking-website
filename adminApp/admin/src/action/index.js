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
  FETCH_AIRPORTS,
  FETCH_AIRPORT,
  CREATE_AIRPORT,
  CREATE_AIRLINER,
  DELETE_AIRPORT,
  DELETE_AIRLINER,
  EDIT_AIRPORT,
  FETCH_AIRLINER,
  EDIT_AIRLINER,
  FETCH_BOOKINGS,
  CLEAR_BOOKINGS,
  DELETE_BOOKING
} from "./type";
import axiosJWT from '../api/axiosJWT';
import axios from 'axios';
import store from '../myStore';
import history from '../history';

export const signIn = (formValues) => async dispatch => {
  try {
    const res = await axios.post("authentication/login", formValues);
    if(res.status === 201) {
      dispatch({
        type: SIGN_IN,
        payload: res.data
      });
      history.push('/');
      dispatch(showAlert('Welcome admin!', 'success'));
        setTimeout(() => {
          dispatch(hideAlert())
        }, 2000);
    }
  } catch (error) {
    dispatch(showAlert(error.response.data.error, 'error'));
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
  const res = await axiosJWT.get('/flight/?limit=100', {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_FLIGHTS,
    payload: res.data
  });
}

export const fetchFlight = (flightId) => async dispatch => {
  const res = await axiosJWT.get(`/flight/${flightId}`, {
    headers: {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_FLIGHT,
    payload: res.data
  });
}

export const createFlight = (formValues) => async dispatch => {
  const res = await axiosJWT.post('/flight', formValues, {
    headers: {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  if(res.status === 201) {
    dispatch({
      type: CREATE_FLIGHT,
      payload: res.data
    });  
    dispatch(showAlert('Create flight success!', 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
    history.push('/flights');
  }
}

export const editFlight = (id, formValues) => async dispatch => {
  try {
    const res = await axiosJWT.patch(`/flight/${id}`, formValues, {
      headers: {
        authorization: 'Bearer ' + store.getState().auth.accessToken
      }
    });
    dispatch({
      type: EDIT_FLIGHT,
      payload: res.data
    })
    dispatch(showAlert('Update flight success!', 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
    history.push('/flights');
  } catch(err) {
    dispatch(showAlert(err.response.data, 'error'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
  }
}

export const deleteFlight = (flight) => async dispatch => {
  try {
    const res = await axiosJWT.delete(`/flight/${flight._id}`, {
      headers:  {
        authorization: 'Bearer ' + store.getState().auth.accessToken
      }
    });
    dispatch({
      type: DELETE_FLIGHT,
      payload: flight.flightId
    });  
    history.push('/flights');
    dispatch(showAlert('Delete flight success!', 'success'));
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

export const fetchAirliner = (airlinerId) => async dispatch => {
  const res = await axiosJWT.get(`/airliner/${airlinerId}`, {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_AIRLINER,
    payload: res.data
  });
}

export const createAirliner = (formValues) => async dispatch => {
  const res = await axiosJWT.post('/airliner', formValues, {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  if(res.status === 201) {
    dispatch({
      type: CREATE_AIRLINER,
      payload: res.data
    })
    dispatch(showAlert('Create airliner success!', 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
    history.push('/airliners');
  }
  
}

export const editAirliner = (airlinerId, formValues) => async dispatch => {
  try {
    const res = await axiosJWT.patch(`/airliner/${airlinerId}`, formValues, {
      headers:  {
        authorization: 'Bearer ' + store.getState().auth.accessToken
      }
    });
    dispatch({
      type: EDIT_AIRLINER,
      payload: res.data
    })
    history.push('/airliners');
    dispatch(showAlert('Update airliner success!', 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
  } catch(err) {
    dispatch(showAlert(err.response.data, 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
  }
}

export const deleteAirliner = (airlinerId) => async dispatch => {
  try {
    const res = await axiosJWT.delete(`/airliner/${airlinerId}`, {
      headers:  {
        authorization: 'Bearer ' + store.getState().auth.accessToken
      }
    });
    dispatch({
      type: DELETE_AIRLINER,
      payload: airlinerId
    })
    dispatch(showAlert('Delete airliner success!', 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
  } catch(err) {
    dispatch(showAlert(err.response.data, 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
  }
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

export const fetchAirport = (airportId) => async dispatch => {
  const res = await axiosJWT.get(`/airport/${airportId}`, {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: FETCH_AIRPORT,
    payload: res.data
  })
}

export const createAirport = (formValues) => async dispatch => {
  const res = await axiosJWT.post('/airport', formValues,  {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  if(res.status === 201) {
    dispatch({
      type: CREATE_AIRPORT,
      payload: res.data
    }); 
    dispatch(showAlert('Create airport success!', 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000);
    history.push('/airports');
  }
}

export const editAirport = (id, formValues) => async dispatch => {
  try {
    const res = await axiosJWT.patch(`/airport/${id}`, formValues,  {
      headers:  {
        authorization: 'Bearer ' + store.getState().auth.accessToken
      }
    });
    dispatch({
      type: EDIT_AIRPORT,
      payload: res.data
    });
    history.push('/airports');
    dispatch(showAlert('Update airport success!', 'success'));
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

export const deleteAirport = (airportId) => async dispatch => {
  try {
    const res = await axiosJWT.delete(`/airport/${airportId}`,  {
      headers:  {
        authorization: 'Bearer ' + store.getState().auth.accessToken
      }
    });
    dispatch({
      type: DELETE_AIRPORT,
      payload: airportId
    });
    dispatch(showAlert('Delete airport success!', 'success'));
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

export const fetchBookings = (flightId) => async dispatch => {
  const res = await axiosJWT.get('/booking/flight', {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    },
    params : {
      flightId: flightId
    }
  });
  dispatch({
    type: FETCH_BOOKINGS,
    payload: res.data,
  });
}

export const clearBookings = () => {
  return {
    type: CLEAR_BOOKINGS,
  }
}

export const deleteBooking = (bookingId) => async dispatch => {
  await axiosJWT.delete(`/booking/${bookingId}`,  {
    headers:  {
      authorization: 'Bearer ' + store.getState().auth.accessToken
    }
  });
  dispatch({
    type: DELETE_BOOKING,
    payload: bookingId
  });
  dispatch(showAlert('Delete booking success!', 'success'));
    setTimeout(() => {
      dispatch(hideAlert())
  }, 3000);
}