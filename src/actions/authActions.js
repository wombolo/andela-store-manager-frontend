/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode';
import {ACTION_TYPES} from './action-types';
import vyStoreBackend from '../apis/vyStoreBackend'
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
    const res = await vyStoreBackend.post('/auth/login', userData);

    const { token } = res.data;
    if (token) {
      const decoded = jwt_decode(token);
      localStorage.setItem('authToken', token);
      if (decoded) {
        window.location.replace('/all-products');
      }
      dispatch(setCurrentUser(decoded));
    }
  } catch (err) {
    dispatch(setUserError('Authentication failed. Check your password and try again'));
    await Notify.notifyError('Authentication failed. Check your password and try again');
    setTimeout(() => (window.location.replace('/login')), 1500)
  }
};

export const handleLogout = (error) => {
  if (error.response.data.message==='jwt expired') {
    localStorage.clear();
    window.location.reload();
    return 'Logged out';
  }
};
