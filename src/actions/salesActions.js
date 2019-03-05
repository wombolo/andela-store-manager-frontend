/* eslint-disable camelcase */
import {handleLogout} from './authActions';
import {ACTION_TYPES} from './action-types';
import Notify from '../utils/Notify';
import vyStoreBackendAPI from '../apis/vyStoreBackend'

const {
  GET_ALL_SALES
} = ACTION_TYPES;


export const setAllSales = payload => ({
  type: GET_ALL_SALES,
  payload,
});

export const getAllSales = () => async (dispatch) =>{
  try{
    const sales = await vyStoreBackendAPI.get('/sales');
    dispatch(setAllSales(sales.data.sales));
  }
  catch(e){
    handleLogout(e);
    console.log(e.response);
  }
};
