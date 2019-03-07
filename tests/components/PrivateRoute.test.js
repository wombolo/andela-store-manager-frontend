import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { PrivateRoute } from '../../src/components/PrivateRoute.jsx';
import {Login} from "../../src/components/Login";
import {MemoryRouter} from "react-router-dom";

let wrapper;

const props = {
  component: () => Promise.all(),
  auth: {
    user: {
      profile: {
        id: 1,
        firstname: 'Akano',
        lastname: 'Peter',
        email: 'elkenzom1@gmail.com',
        role: 'admin',
        image: 'team-7.jpg',
        password: null
      },
      iat: 1551952568,
      exp: 1552038968
    },
    isAuthenticated: true,
    error: '',
    isLoading: false
  },
};


describe('PrivateRoute Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<PrivateRoute {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {

    beforeEach(() => {
      // store = createStore(combineReducers({}));
      wrapper = mount(<PrivateRoute {...props}/>);
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });
});


describe('Methods in Class', () => {

  it('triggers when user not logged in', () => {
    props.auth.isAuthenticated = false;
    wrapper = mount(<MemoryRouter><PrivateRoute {...props}/></MemoryRouter>);
  });
});

