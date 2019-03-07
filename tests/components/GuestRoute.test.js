import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { GuestRoute } from '../../src/components/GuestRoute.jsx';
import {MemoryRouter} from "react-router-dom";

let wrapper;

const props = {
  component: () => null,
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
  location:{}
};


describe('GuestRoute Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<GuestRoute {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {
    beforeEach(() => {
      wrapper = mount(<MemoryRouter><GuestRoute {...props}/></MemoryRouter>);
    });

    afterEach(() => {
      wrapper.unmount();
    });


    it('triggers when user is not logged in', () => {
      props.auth.isAuthenticated = false;
      const newWrapper = mount(<MemoryRouter><GuestRoute {...props}/></MemoryRouter>);
    });

  });
});


