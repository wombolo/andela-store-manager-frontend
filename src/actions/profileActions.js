/* eslint-disable camelcase */
import {handleLogout} from './authActions';
import {ACTION_TYPES} from './action-types';
import Notify from '../utils/Notify';
import vyStoreBackendAPI from '../apis/vyStoreBackend'

const {
  GET_SINGLE_PROFILE,
} = ACTION_TYPES;


export const addNewProfile = (payload) => async (dispatch) =>{
  try{
    //Add cloudinary Support
    const newProduct = {
      title: payload.title,
      // image: payload.image.name || `product-${Math.floor(Math.random() *7) + 1}` ,
      image: `products/product-${Math.floor(Math.random() *9) + 1}.png` ,
      description: payload.description,
      price: payload.price,
      quantity: payload.quantity,
    };

    const products = await vyStoreBackendAPI.post('/products',
      newProduct);
    await Notify.notifySuccess('Product added successfully');
    window.location.replace('/all-products')
  }
  catch(e){
    handleLogout(e);
    await Notify.notifyError('Error Occurred while adding. Please try again')
  }
};

export const editProfile = (payload) => async (dispatch) =>{
  try{
    console.log('-->',payload);
    const productUpdateAPI = await vyStoreBackendAPI.put(`/profiles/${payload.id}`,
      payload);

    await Notify.notifySuccess('Profile modified successfully');
    window.location.replace(`/profile/${payload.id}`)
  }
  catch(e){
    handleLogout(e);
    await Notify.notifyError('Error Occurred while updating. Please try again')
  }
};


export const setSingleProfile = payload => ({
  type: GET_SINGLE_PROFILE,
  payload,
});


export const getSingleProfile = (id) => async (dispatch) =>{
  try{
    const profile = await vyStoreBackendAPI.get(`/profiles/${id}`);
    dispatch(setSingleProfile(profile.data.profile));
  }
  catch(e){
    console.log(e.response);
  }
};
