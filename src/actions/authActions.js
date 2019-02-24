/* eslint-disable camelcase */
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {ACTION_TYPES} from './action-types';
import { basePath } from '../utils/basePath';
import Notify from '../utils/Notify';

const {
  SET_CURRENT_USER, SET_USER_REQUEST, SET_USER_ERROR
} = ACTION_TYPES;

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});
export const setUserRequest = () => ({
  type: SET_USER_REQUEST,
});
export const setUserError = error => ({
  type: SET_USER_ERROR,
  payload: error,
});

export const loginUser = userData => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    const res = await axios.post(`${basePath}/auth/login`, userData);

    const { token } = res.data;
    const decoded = jwt_decode(token);
    localStorage.setItem('authToken', token);
    if (decoded) {
      window.location.replace('/dashboard');
    }
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch(setUserError(err.response.data.message));
    Notify.notifyError(err.response.data.messages);
  }
};
