import {ACTION_TYPES} from '../actions/action-types';

const {
  GET_ALL_PROFILES, GET_SINGLE_PROFILE,
} = ACTION_TYPES;


const initialState = {
  profile:'',
  isLoading: true,
};

/**
 * @param {object} state
 * @param {object} action
 *  @returns {object} state, user
 */
export default (state = initialState, action) => {
  switch (action.type) {

    case GET_SINGLE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
