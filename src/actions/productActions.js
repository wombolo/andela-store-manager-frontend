/* eslint-disable camelcase */
import {handleLogout} from './authActions';
import {ACTION_TYPES} from './action-types';
import Notify from '../utils/Notify';
import vyStoreBackendAPI from '../apis/vyStoreBackend'

const {
  GET_ALL_PRODUCTS, ADD_TO_CART, CART_UPDATED, GET_SINGLE_PRODUCTS,
  GET_ALL_IN_CART, CHECK_OUT_PROCESSED
} = ACTION_TYPES;


export const setAllProducts = payload => ({
  type: GET_ALL_PRODUCTS,
  payload,
});

export const getAllCartItems = () => ({
  type: GET_ALL_IN_CART,
});

export const getAllProducts = () => async (dispatch) =>{
  try{
    const products = await vyStoreBackendAPI.get('/products');
    dispatch(setAllProducts(products.data.products));
  }
  catch(e){
    handleLogout(e);
    console.log(e.response);
  }
};


export const addNewProduct = (payload) => async (dispatch) =>{
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

export const editProduct = (payload) => async (dispatch) =>{
  try{
    // if (payload.image_file){ //UPLOAD TO CLOUDINARY// }

    const product = {
      title: payload.title,
      image: `products/product-${Math.floor(Math.random() *9) + 1}.png` ,
      description: payload.description,
      price: payload.price,
      quantity: payload.quantity,
    };

    const productUpdateAPI = await vyStoreBackendAPI.put(`/products/${payload.id}`,
      product);
    await Notify.notifySuccess('Product modified successfully');
    window.location.replace(`/edit-product/${payload.id}`)
  }
  catch(e){
    handleLogout(e);
    await Notify.notifyError('Error Occurred while updating. Please try again')
  }
};


export const deleteProduct = (id) => async (dispatch) =>{
  try{
    const productDeleteAPI = await vyStoreBackendAPI.delete(`/products/${id}`);
    await Notify.notifySuccess('Product deleted successfully');
    window.location.replace('/all-products');
  }
  catch(e){
    handleLogout(e);
    await Notify.notifyError('Error Occurred while deleting. Please try again')
  }
};

export const cartUpdated = () =>({
  type: CART_UPDATED,
});

export const addToCartAction = (payload) =>({
  type: ADD_TO_CART,
  payload,
});


export const addToCart = (payload) => dispatch =>{
  dispatch(addToCartAction(payload));
  dispatch(cartUpdated());
};


export const checkOutProcessed = () =>({
  type: CHECK_OUT_PROCESSED,
});


export const handleCheckout = payload => async  (dispatch) => {
  payload.forEach(async ( item )=> {
    const {
      title, cartQty: quantity, id: product_id, price, description
    } = item;

    const newSale = await vyStoreBackendAPI.post('/sales', {
      title, quantity, product_id, price, description
    });
  });

  Notify.notifySuccess('Products Checkout Successful');
  // localStorage.setItem('userCart',[]);
  dispatch(checkOutProcessed);
};


export const setSingleProduct = payload => ({
  type: GET_SINGLE_PRODUCTS,
  payload,
});


export const getSingleProducts = (id) => async (dispatch) =>{
  try{
    const products = await vyStoreBackendAPI.get(`/products/${id}`);
    dispatch(setSingleProduct(products.data.product));
  }
  catch(e){
    console.log(e.response);
  }
};
