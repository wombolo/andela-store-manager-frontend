import profilesReducer from '../../src/reducers/profilesReducer';

import {ACTION_TYPES}from '../../src/actions/action-types';

const {GET_SINGLE_PROFILE} = ACTION_TYPES;
// import mockData from '../__mocks__/mockData';

const initialState = {
  profile:'',
  isLoading: true
};

const profiles = {
  singleProfile:{
    id: 1, firstname: "Marilyn", lastname: "Cole",
    email: 'mary.cole@ini.net',  role: "admin", image: "images/pix1.png",password:'12345'
  }
};



describe('Profiles Reducer', () => {
  it('should return the initial state', () => {
    expect(profilesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_SINGLE_PROFILE', () => {
    const action = {
      type: GET_SINGLE_PROFILE,
      payload: profiles.singleProfile
    };
    const newState = profilesReducer(initialState, action);
    expect(newState).toEqual({profile: profiles.singleProfile, isLoading: false});
  });

});
