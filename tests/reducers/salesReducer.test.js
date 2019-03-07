import salesReducer from '../../src/reducers/salesReducer';

import {ACTION_TYPES}from '../../src/actions/action-types';

const {GET_ALL_SALES} = ACTION_TYPES;
// import mockData from '../__mocks__/mockData';

const initialState = {
  sales:[],
  singleSales:'',
  isLoading: true,
};

const profiles = {
  singleSale:{id: 4, product_id: 2, title: "Epa Wei-cheng", description: "Stromae Anichebe", price: 42, quantity: 3}
};



describe('Sales Reducer', () => {
  it('should return the initial state', () => {
    expect(salesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ALL_SALES', () => {
    const action = {
      type: GET_ALL_SALES,
      payload: profiles.singleSale
    };
    const newState = salesReducer(initialState, action);
    expect(newState).toEqual({sales: profiles.singleSale, singleSales: '', isLoading: false});
  });

});
