import {ACTION_TYPES} from '../actions/action-types';

const {
  GET_ALL_PRODUCTS, ADD_TO_CART,CART_UPDATED, GET_SINGLE_PRODUCTS, REMOVE_FROM_CART
} = ACTION_TYPES;

let newCart = [];

if (localStorage.getItem('userCart')){
  const cart = JSON.parse(localStorage.getItem('userCart'));
  newCart = [...cart];
}

const initialState = {
  products:[],
  singleProduct:'',
  isLoading: true,
  cart: newCart
};

/**
 * @param {object} state
 * @param {object} action
 *  @returns {object} state, user
 */
export default function (state = initialState, action) {
  switch (action.type) {

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };

    case GET_SINGLE_PRODUCTS:
      return {
        ...state,
        singleProduct: action.payload,
        isLoading: false,
      };

    case ADD_TO_CART:
      // console.log('+++', action.payload);
      const newCart = state.cart;

      //Find if product has been added before
      if (!newCart.find(o => o.id === action.payload.id )) {
        action.payload.cartQty = 1;
        newCart.push(action.payload);
      }

    // else increment quantity
      else {
        //Ensure user doesn't exceeed quantity in the system
        const position =  newCart.findIndex((elem) => (elem.id === action.payload.id ));

        if (newCart[position].quantity > 0 ) {
          newCart[position].cartQty += 1;
          newCart[position].quantity -= 1;
        }
      }
      localStorage.setItem('userCart', JSON.stringify(newCart));

      return{
        ...state,
        cart: newCart
      };

    case 2:
      localStorage.setItem('userCart', JSON.stringify(action.payload));
      return{
        ...state,
        cart: action.payload
      };

    case CART_UPDATED:
      return{
        ...state,
        numberInCart: state.cart.length
      };

    default:
      return state;
  }
}
