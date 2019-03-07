import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Menu } from '../../src/components/Menu.jsx';

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
      iat: 1551809044,
      exp: 1551895444
    },
    isAuthenticated: true,
    error: '',
    isLoading: false
  },
};


const mockStore = configureStore([thunk]);

const store = mockStore({ ...props });


describe('Menu Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<Menu {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
          <Menu {...props} />
          </MemoryRouter>
        </Provider>,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('triggers handleLogout()', () => {
      const MenuComp = wrapper.find('Menu');
      sinon.spy(MenuComp.instance(), 'handleLogout');

      MenuComp.instance().handleLogout();
      expect(MenuComp.instance().handleLogout.calledOnce)
        .toEqual(true);
    });

    //
    // it('triggers handleRemoveFromMenu()', () => {
    //   const MenuComp = wrapper.find('Menu');
    //
    //   sinon.spy(MenuComp.instance(), 'handleRemoveFromMenu');
    //
    //   MenuComp.instance().handleRemoveFromMenu(1);
    //   expect(MenuComp.instance().handleRemoveFromMenu.calledOnce)
    //     .toEqual(true);
    //
    //   // const button = MenuComp.find('button').last();
    //   // button.simulate('click', 1);
    // });
    //
    //
    // it('triggers handleSubmit()', () => {
    //   const MenuComp = wrapper.find('Menu');
    //
    //   sinon.spy(MenuComp.instance(), 'handleSubmit');
    //   MenuComp.instance().handleSubmit({preventDefault: () => {}});
    //   expect(MenuComp.instance().handleSubmit.calledOnce)
    //     .toEqual(true);
    // });
  });


  describe('Methods in Class', () => {

    beforeEach(() => {
      props.auth.isAuthenticated=false;
      props.auth.user.profile.role='store_attendant';

      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
          <Menu {...props} />
          </MemoryRouter>
        </Provider>,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('show links for unauthenticated user', () => {
      const MenuComp = wrapper.find('Menu');
      sinon.spy(MenuComp.instance(), 'handleLogout');

      MenuComp.instance().handleLogout();
      expect(MenuComp.instance().handleLogout.calledOnce)
        .toEqual(true);
    });
  });
});
