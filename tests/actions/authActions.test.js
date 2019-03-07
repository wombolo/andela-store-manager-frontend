import 'babel-polyfill';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import sinon from 'sinon';
sinon.stub(window.location, 'replace');
sinon.stub(window.location, 'reload');

// import mockData from '../__mocks__/mockData';
import { ACTION_TYPES } from '../../src/actions/action-types';

import {
  handleLogout,
  loginUser
} from '../../src/actions/authActions';

const loginDetails = {email: 'elkenzom1@gmail.com', password:'12345'};
const userDecoded = {
  profile: {
    id: 1,
    firstname: 'Akano',
    lastname: 'Peter',
    email: 'elkenzom1@gmail.com',
    role: 'admin',
    image: 'team-7.jpg',
    password: null
  },
  iat: 1551799926,
  exp: 1551886326
};


describe('AUTH actions', () => {
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it(`dispatches SET_USER_REQUEST and SET_CURRENT_USER when login`, (done) => {
    const expectedActions = [{
      type: ACTION_TYPES.SET_USER_REQUEST,
    }, {
      type: ACTION_TYPES.SET_CURRENT_USER,
      payload: userDecoded,
    },
    ];
    const store = mockStore({});
    return store.dispatch(loginUser(loginDetails))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        done();
      });
  });

  it(`dispatches SET_USER_ERROR when login unsuccessful`, (done) => {
    const expectedActions = [{
      type: ACTION_TYPES.SET_USER_ERROR,
      error: 'Authentication failed. Check your password and try again'
    }];

    const store = mockStore({});
    return store.dispatch(loginUser({email: 'elk@gmail.com', password:'12345'}))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[0].type);
        done();
      });
  });


  it(`handleLogout()`, (done) => {
    const error = {
      response:{data:{message:'jwt expired'}}
    };
    expect(handleLogout(error)).toEqual('Logged out');
    done();
  });

});
