import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { TopBar } from '../../src/components/TopBar.jsx';

let wrapper;

const props = {
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
      iat: 1551974375,
      exp: 1552060775
    },
    TopBarLength:2,
  }

};


const mockStore = configureStore([thunk]);

const store = mockStore({ ...props });


describe('TopBar Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<TopBar {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
          <TopBar {...props} />
          </MemoryRouter>
        </Provider>,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('handles no profile', () => {
      props.auth.user.profile = null;

      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <TopBar {...props} />
          </MemoryRouter>
        </Provider>,
      );

    });


  });
});
