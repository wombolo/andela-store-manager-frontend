import jwtDecode from 'jwt-decode';
import {ACTION_TYPES} from '../actions/action-types';
import isEmpty from '../utils/isEmpty';

const {
  SET_CURRENT_USER, SET_USER_REQUEST, SET_USER_ERROR
} = ACTION_TYPES;


let authToken = null;
let isAuthenticated = false;
let currentUser = {};

if (localStorage.getItem('authToken')) {
  authToken = localStorage.getItem('authToken');
  currentUser = jwtDecode(authToken);
}

if (authToken) isAuthenticated = true;

const initialState = {
  user: currentUser,
  isAuthenticated,
  error: '',
  isLoading: false,
};

/**
 * @param {object} state
 * @param {object} action
 *  @returns {object} state, user
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_REQUEST:
      return {
        isLoading: true,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        isLoading: false,
      };

    case SET_USER_ERROR:
      return {
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
