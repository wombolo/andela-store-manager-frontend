import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import salesReducer from "./salesReducer";

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  sales: salesReducer,
});
