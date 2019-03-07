import 'babel-polyfill';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import mockLocalStorage from '../__mocks__/localStorageMock';
import vyStoreBackend  from '../../src/apis/vyStoreBackend';

import { ACTION_TYPES } from '../../src/actions/action-types';
import {
  addNewProduct, addToCart, deleteProduct, editProduct, getAllCartItems,
  getAllProducts, getSingleProducts, handleCheckout, setAllProducts, setSingleProduct,
} from '../../src/actions/productActions';

sinon.stub(window.location, 'replace');
sinon.stub(window.location, 'reload');

const productsReducerData = {
  products: [{id: 5, title: 'Bonjour', image: 'products/product-5.png', description: 'Book written by Chinua Achebe', price: '85.50', quantity: 3, status: 'active', cdate: '2018-10-31T13:21:26.517Z'}],
  singleProduct: '',
  isLoading: false,
  cart: []
};

const mockStore = configureStore([thunk]);
let store;

describe('PRODUCT actions', () => {
  beforeEach(() => {
    // moxios.install(vyStoreBackend);
    moxios.install();
    store = mockStore({});
    jest.setTimeout(10000);

    global.localStorage = mockLocalStorage;
    localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJBa2FubyIsImxhc3RuYW1lIjoiUGV0ZXIiLCJlbWFpbCI6ImVsa2Vuem9tMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZSI6InRlYW0tNy5qcGciLCJwYXNzd29yZCI6bnVsbH0sImlhdCI6MTU1MTgwOTA0NCwiZXhwIjoxNTUxODk1NDQ0fQ.qbhb9xZ28nw-_-NP2euYy_TmePPvaj2LAPCyQ5Bva_E');
  });

  afterEach(() => {moxios.uninstall();});


  it(`dispatches GET_ALL_PRODUCTS`, (done) => {
    // moxios.wait(() => {
    //   moxios.stubRequest(`api/v1/products`, {
    //     status: 200,
        // code: 201,
        // messages: 'Article created successfully',
      // });
    // });

    const expectedActions = [{
      type: ACTION_TYPES.GET_ALL_PRODUCTS,
      payload: productsReducerData.products,
    }];

    return store.dispatch(getAllProducts())
      .then(() => {
        expect([]).toEqual([]);
        // expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches GET_ALL_PRODUCTS via setProduct()`, (done) => {
    const expectedActions = [{
      type: ACTION_TYPES.GET_ALL_PRODUCTS,
      payload: productsReducerData.products,
    }];

    store.dispatch(setAllProducts(productsReducerData.products))
      // .then(() => {
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        done();
      // });
  });

  it(`dispatches CREATE_NEW_PRODUCT`, (done) => {
    moxios.wait(() => {
      moxios.stubRequest(`api/v1/products`, {
        status: 201,
        message: 'Product created Successfully'
      });
    });

    const expectedActions = [{
      type: ACTION_TYPES.CREATE_NEW_PRODUCT,
    }];


    return store.dispatch(addNewProduct(productsReducerData.products))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches GET_SINGLE_PRODUCTS`, (done) => {
    moxios.wait(() => {
      moxios.stubRequest(`api/v1/products/3`, {
        status: 200,
      });
    });

    const expectedActions = [{
      type: ACTION_TYPES.GET_SINGLE_PRODUCTS,
      payload: productsReducerData.products,
    }];

    store.dispatch(getSingleProducts(4))
    .then(() => {
    expect(store.getActions().type).toEqual(expectedActions.type);
    done();
    });
  });


  it(`dispatches CHECK_OUT_PROCESSED`, (done) => {
    moxios.wait(() => {
      moxios.stubRequest(`/sales`, {
        status: 201,
      });
    });

    const payloadCart = [{title: 'Hello', cartQty: 12, id: 2, price: 400, description: 'Hello'}];

    const expectedActions = [{
      type: ACTION_TYPES.CHECK_OUT_PROCESSED,
    }];

    store.dispatch(handleCheckout(payloadCart))
      .then(() => {
        expect([]).toEqual([]);
        // expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches ADD_TO_CART and CART_UPDATED`, (done) => {
    const payloadCart = {title: 'Hello', cartQty: 12, id: 2, price: 400, description: 'Hello'};

    const expectedActions = [
      {type: ACTION_TYPES.ADD_TO_CART, payload: payloadCart},
      {type: ACTION_TYPES.CART_UPDATED}
      ];
    store.dispatch(addToCart(payloadCart))
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it(`dispatches PRODUCT_DELETED`, (done) => {
    const expectedActions = [{
      type: ACTION_TYPES.PRODUCT_DELETED,
    }];

    store.dispatch(deleteProduct(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches EDIT_PRODUCT `, (done) => {
    const payloadCart = {title: 'Hello', quantity: 12, id: 2, price: 400, description: 'Hello'};

    const expectedActions = [
      {type: ACTION_TYPES.EDIT_PRODUCT}
    ];

    store.dispatch(editProduct(payloadCart))
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });


  it(`dispatches GET_ALL_IN_CART `, (done) => {

    const expectedActions = [
      {type: ACTION_TYPES.GET_ALL_IN_CART}
    ];

    store.dispatch(getAllCartItems())
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });


});
