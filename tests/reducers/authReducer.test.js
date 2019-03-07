import authReducer from '../../src/reducers/authReducer';
import localStorage from '../__mocks__/localStorageMock';

import {ACTION_TYPES}from '../../src/actions/action-types';
import jwtDecode from "jwt-decode";

const {
  SET_CURRENT_USER, SET_USER_REQUEST, SET_USER_ERROR, GET_AUTH_USER
} = ACTION_TYPES;
// import mockData from '../__mocks__/mockData';


let authToken = null;
let isAuthenticated = false;
let currentUser = {};

localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJBa2FubyIsImxhc3RuYW1lIjoiUGV0ZXIiLCJlbWFpbCI6ImVsa2Vuem9tMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZSI6InRlYW0tNy5qcGciLCJwYXNzd29yZCI6bnVsbH0sImlhdCI6MTU1MTc4NzgxNSwiZXhwIjoxNTUxODc0MjE1fQ.2Ocoh7uodmxDjkahmnMw3tdxAG16h3WRVppnrIIgW-I');

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

const auth = {
  profile: {
    id: 1,
    firstname: 'Akano',
    lastname: 'Peter',
    email: 'elkenzom1@gmail.com',
    role: 'admin',
    image: 'team-7.jpg',
    password: null
  },
};


describe('Products Reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {}).isLoading).toEqual(initialState.isLoading);
  });

  it('should handle SET_USER_REQUEST', () => {
    const action = {
      type: SET_USER_REQUEST,
    };
    const newState = authReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
  });


  it('should handle SET_CURRENT_USER', () => {
    const action = {
      type: SET_CURRENT_USER,
      payload: auth.profile
    };
    const newState = authReducer(initialState, action);
    expect(newState.user).toEqual(auth.profile);
  });


  it('should handle SET_USER_ERROR', () => {
    const action = {
      type: SET_USER_ERROR,
    };
    const newState = authReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
  });
});
