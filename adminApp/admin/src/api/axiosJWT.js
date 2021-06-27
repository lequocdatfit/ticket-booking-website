import axios from 'axios';
import store from '../myStore';
import jwt_decode from 'jwt-decode';
import { REFRESH_TOKEN } from '../action/type';

const axiosJWT = axios.create();

axiosJWT.defaults.headers.common['authorization'] = "Bearer " + store.getState().auth.accessToken;

const refreshToken = async() => {
  try {
    const res = await axios.post('/authentication/refresh-token', {
      refreshToken: store.getState().auth.refreshToken
    });
    store.dispatch({
      type: REFRESH_TOKEN,
      payload: res.data.accessToken
    });
    return res.data.accessToken;
  } catch(err) {
    console.log(err);
  }
}

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwt_decode(store.getState().auth.accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["authorization"] = "Bearer " + data;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;