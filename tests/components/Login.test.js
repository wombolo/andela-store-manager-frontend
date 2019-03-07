import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { Login } from '../../src/components/Login.jsx';

let wrapper;

const props = {
  loginUser: () => null,
  history:{},
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


describe('Login Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<Login {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {

    beforeEach(() => {
      // store = createStore(combineReducers({}));
      wrapper = mount(<Login {...props}/>);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('triggers handleSubmit()', () => {
      sinon.spy(wrapper.instance(), 'handleSubmit');
      wrapper.instance().handleSubmit({preventDefault: () => {}});
      expect(wrapper.instance().handleSubmit.calledOnce)
        .toEqual(true);
    });

    it('triggers handleChange() for input title', () => {
      sinon.spy(wrapper.instance(), 'handleChange');
      wrapper.instance().handleChange({target: { value: 'u' , id: 'title'} });
      expect(wrapper.instance().handleChange.calledOnce)
        .toEqual(true);
    });

  });
});

describe('Methods in Class', () => {

it('triggers handleSubmit() when not logged in', () => {
  props.auth.isLoading = true;
  wrapper = mount(<Login {...props}/>);


  sinon.spy(wrapper.instance(), 'handleSubmit');
  wrapper.instance().handleSubmit({preventDefault: () => {}});
  expect(wrapper.instance().handleSubmit.calledOnce)
    .toEqual(true);
});

});
