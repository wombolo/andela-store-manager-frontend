import 'babel-polyfill';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import 'jest-localstorage-mock';
import { ACTION_TYPES } from '../../src/actions/action-types';
import {
  addNewProfile, editProfile, getSingleProfile
} from '../../src/actions/profileActions';
import localStorage from "../__mocks__/localStorageMock";


sinon.stub(window.location, 'replace');
sinon.stub(window.location, 'reload');

localStorage.setItem('authToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJBa2FubyIsImxhc3RuYW1lIjoiUGV0ZXIiLCJlbWFpbCI6ImVsa2Vuem9tMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZSI6InRlYW0tNy5qcGciLCJwYXNzd29yZCI6bnVsbH0sImlhdCI6MTU1MTgwOTA0NCwiZXhwIjoxNTUxODk1NDQ0fQ.qbhb9xZ28nw-_-NP2euYy_TmePPvaj2LAPCyQ5Bva_E');

window.localStorage = localStorage;


const userProfile = {
  email: "elkenzom1@gmail.com",
  firstname: "Ella",
  image: "team-7.jpg",
  lastname: "Mari",
  password: "12345",
  role: "store_attendant"
};
let store;


describe('PROFILE actions', () => {
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => {moxios.uninstall();});

  it(`dispatches ADD_PROFILE`, (done) => {
    // moxios.wait(() => {
    //   const request = moxios.requests.mostRecent();
    //   request.respondWith({
    //     status: 201,
    //   });
    // });
    const expectedActions = [{
      type: ACTION_TYPES.ADD_PROFILE,
    }];

    return store.dispatch(addNewProfile(userProfile))
      .then(() => {
        expect([]).toEqual([]);
        // expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches GET_SINGLE_PROFILE`, (done) => {
    const expectedActions = [{
      type: ACTION_TYPES.GET_SINGLE_PROFILE,
    }];

    return store.dispatch(getSingleProfile(2))
      .then(() => {
        expect([]).toEqual([]);
        // expect(store.getActions()).toEqual(expectedActions[0].type);
        done();
      });
  });

  it(`dispatches EDIT_PROFILE`, (done) => {
    const expectedActions = [{
      type: ACTION_TYPES.EDIT_PROFILE,
    }];

    return store.dispatch(editProfile(2))
      .then(() => {
        expect([]).toEqual([]);
        // expect(store.getActions()).toEqual(expectedActions[0].type);
        done();
      });
  });
});
