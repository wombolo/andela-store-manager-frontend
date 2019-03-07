/* eslint-disable camelcase */
import {handleLogout} from './authActions';
import {ACTION_TYPES} from './action-types';
import Notify from '../utils/Notify';
import vyStoreBackendAPI from '../apis/vyStoreBackend'

const {
  GET_ALL_PRODUCTS, ADD_TO_CART, CART_UPDATED, GET_SINGLE_PRODUCTS,
  GET_ALL_IN_CART, CHECK_OUT_PROCESSED, CREATE_NEW_PRODUCT,
  PRODUCT_DELETED, EDIT_PRODUCT, REMOVE_FROM_CART
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
    // console.log(e.response);
  }
};


export const createProduct = () => ({
  type: CREATE_NEW_PRODUCT,
});

export const addNewProduct = (payload) => async (dispatch) =>{
  try{
    dispatch(createProduct());
    payload.image = `products/product-${Math.floor(Math.random() *9) + 1}.png`;

    const products = await vyStoreBackendAPI.post('/products',
      payload);
    await Notify.notifySuccess('Product added successfully');
    window.location.replace('/all-products');
  }
  catch(e){
    handleLogout(e);
    await Notify.notifyError('Error Occurred while adding. Please try again')
  }
};


export const productEdited = () =>({
  type: EDIT_PRODUCT,
});

export const editProduct = (payload) => async (dispatch) =>{
  try{
    // if (payload.image_file){ //UPLOAD TO CLOUDINARY// }

    dispatch(productEdited());

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


export const productDeleted = () =>({
  type: PRODUCT_DELETED,
});

export const deleteProduct = (id) => async (dispatch) =>{
  try{
    dispatch(productDeleted());
    const productDeleteAPI = await vyStoreBackendAPI.delete(`/products/${id}`);
    await Notify.notifySuccess('Product deleted successfully');
    window.location.replace('/all-products');
  }
  catch(e){
    handleLogout(e);
    await Notify.notifyError('Error Occurred while deleting. Please try again')
  }
};


export const addToCartAction = (payload) =>({
  type: ADD_TO_CART,
  payload,
});

export const cartUpdated = () =>({
  type: CART_UPDATED,
});

export const addToCart = (payload) => dispatch =>{
  dispatch(addToCartAction(payload));
  dispatch(cartUpdated());
};


export const cartUpdatedAfterDelete = (payload) =>({
  type: REMOVE_FROM_CART,
  payload
});

export const removeFromStoreCart = (payload) => dispatch =>{
  dispatch(cartUpdatedAfterDelete(payload));
};

export const checkOutProcessed = () =>({
  type: CHECK_OUT_PROCESSED,
});


export const handleCheckout = payload => async  (dispatch) => {
  payload.forEach( async (item)=> {
    const {
      title, cartQty: quantity, id: product_id, price, description
    } = item;

    const newSale = await vyStoreBackendAPI.post('/sales', {
      title, quantity, product_id, price, description
    });
  });

  Notify.notifySuccess('Products Checkout Successful');
  localStorage.setItem('userCart',[]);
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
    // console.log(e);
    Notify.notifyError('Could not fetch product. Try again later');
  }
};
