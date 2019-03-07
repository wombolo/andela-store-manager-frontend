/* eslint-disable camelcase */
import {handleLogout} from './authActions';
import {ACTION_TYPES} from './action-types';
import Notify from '../utils/Notify';
import vyStoreBackendAPI from '../apis/vyStoreBackend'

const {
  GET_SINGLE_PROFILE, ADD_PROFILE, EDIT_PROFILE
} = ACTION_TYPES;

export const setNewProfile = () =>({
  type: ADD_PROFILE
});

export const addNewProfile = (payload) => async (dispatch) =>{
  try{
    dispatch(setNewProfile());

    payload.image = 'team-7.jpg';

    const profile = await vyStoreBackendAPI.post('/profiles',
      payload);

    await Notify.notifySuccess('User added successfully');
    window.location.replace(`/profile/${profile.data.newProfile.id}`)
  }
  catch(e){
    handleLogout(e);
    // console.log(e);
    await Notify.notifyError('Error Occurred while adding. Please try again')
  }
};


export const profileEdited = () =>({
  type: EDIT_PROFILE
});

export const editProfile = (payload) => async (dispatch) =>{
  try{
    dispatch(profileEdited());

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
    // console.log(e.response);
    Notify.notifyError('Profile does not exists');
  }
};
