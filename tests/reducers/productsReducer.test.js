import productsReducer from '../../src/reducers/productsReducer';
import localStorage from '../__mocks__/localStorageMock';

import {ACTION_TYPES}from '../../src/actions/action-types';

const {
  GET_ALL_PRODUCTS, ADD_TO_CART,CART_UPDATED, GET_SINGLE_PRODUCTS,
  REMOVE_FROM_CART
} = ACTION_TYPES;
// import mockData from '../__mocks__/mockData';


let newCart = [];
localStorage.setItem('userCart', newCart);

const initialState = {
  products:[],
  singleProduct:'',
  isLoading: true,
  cart: newCart
};

const products = {
  singleProduct: {
    id: 2, title: "Things fall apart", image: "default_pix.png", description: "Book written by Chinua Achebe", price: "42.00", quantity: 3, status: "active",
  }
};

describe('Products Reducer', () => {
  it('should return the initial state', () => {
    expect(productsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ALL_PRODUCTS', () => {
    const action = {
      type: GET_ALL_PRODUCTS,
      payload: products.singleProduct
    };
    const newState = productsReducer(initialState, action);
    expect(newState).toEqual({products: products.singleProduct, singleProduct: '', isLoading: false, cart: newCart});
  });

  it('should handle GET_SINGLE_PRODUCTS', () => {
    const action = {
      type: GET_SINGLE_PRODUCTS,
      payload: products.singleProduct
    };
    const newState = productsReducer(initialState, action);
    expect(newState.singleProduct).toEqual( products.singleProduct);
  });


  it('should handle ADD_TO_CART', () => {
    const action = {
      type: ADD_TO_CART,
      payload: products.singleProduct
    };
    const newState = productsReducer(initialState, action);
    expect(newState.cart).toEqual([products.singleProduct]);
  });

  it('should handle ADD_TO_CART multiple', () => {
    const action = {
      type: ADD_TO_CART,
      payload: products.singleProduct
    };
    const newState = productsReducer(initialState, action);
    expect(newState.cart).toEqual([products.singleProduct]);
  });


  it('should handle REMOVE_FROM_CART', () => {
    const action = {
      type: REMOVE_FROM_CART,
      payload: products.singleProduct
    };
    const newState = productsReducer(initialState, action);
    expect(newState.cart).toEqual(products.singleProduct);
  });


  it('should handle CART_UPDATED', () => {
    const action = {
      type: CART_UPDATED,
    };
    const newState = productsReducer(initialState, action);

    expect(newState.numberInCart).toEqual(1);
  });

});
