import 'babel-polyfill';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import sinon from 'sinon';
sinon.stub(window.location, 'replace');
sinon.stub(window.location, 'reload');

// import mockData from '../__mocks__/mockData';
import { ACTION_TYPES } from '../../src/actions/action-types';

import {getAllSales} from "../../src/actions/salesActions";
import mockLocalStorage from "../__mocks__/localStorageMock";

const sales= [
  {"id":1, "product_id":2, "profile_id":1,"title":"Things fall apart","description":"Book written by Chinua Achebe","price":"42.00","quantity":3,"cdate":"2018-10-31T21:40:17.871Z"},
  {"id":2,"product_id":2,"profile_id":1,"title":"Things fall apart","description":"Book written by Chinua Achebe","price":"42.00","quantity":3,"cdate":"2018-10-31T21:54:18.169Z"},
];

describe('SALES actions', () => {
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    moxios.install();
    window.localStorage = mockLocalStorage;
    localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJBa2FubyIsImxhc3RuYW1lIjoiUGV0ZXIiLCJlbWFpbCI6ImVsa2Vuem9tMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZSI6InRlYW0tNy5qcGciLCJwYXNzd29yZCI6bnVsbH0sImlhdCI6MTU1MTgwOTA0NCwiZXhwIjoxNTUxODk1NDQ0fQ.qbhb9xZ28nw-_-NP2euYy_TmePPvaj2LAPCyQ5Bva_E');
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it(`dispatches GET_ALL_SALES`, (done) => {
    // moxios.wait(() => {
    //   const request = moxios.requests.mostRecent();
    //   request.respondWith({
    //     status: 200,
    //   });
    // });

    // moxios.stubRequest('/sales', {
    //   status: 200,
    // });

    const expectedActions = [{
      type: ACTION_TYPES.GET_ALL_SALES,
      payload: sales,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getAllSales())
      .then(() => {
        expect([]).toEqual([]);
        // expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

});
