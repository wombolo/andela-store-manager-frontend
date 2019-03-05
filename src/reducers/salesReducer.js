import {ACTION_TYPES} from '../actions/action-types';

const {
  GET_ALL_SALES, GET_SINGLE_SALE
} = ACTION_TYPES;

let newCart = [];

if (localStorage.getItem('userCart')){
  const cart = JSON.parse(localStorage.getItem('userCart'));
  newCart = [...cart];
}

const initialState = {
  sales:[],
  singleSales:'',
  isLoading: true,
};

/**
 * @param {object} state
 * @param {object} action
 *  @returns {object} state, user
 */
export default function (state = initialState, action) {
  switch (action.type) {

    case GET_ALL_SALES:
      return {
        ...state,
        sales: action.payload,
        isLoading: false,
      };
    //
    // case GET_SINGLE_PRODUCTS:
    //   return {
    //     ...state,
    //     singleProduct: action.payload,
    //     isLoading: false,
    //   };
    //
    default:
      return state;
  }
}
