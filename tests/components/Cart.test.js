import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Cart } from '../../src/components/Cart.jsx';

let wrapper;

const props = {
  getAllCartItems: () => Promise.resolve(),
  handleCheckout: () => Promise.resolve(),
  cart:[
    {id: 1, title: "Bonjour", image: "products/product-5.png",price: 150, quantity: 3, cartQty: '3', status: "active"},
    {id: 2, title: "Bonjour", image: "products/product-5.png",price: 150, quantity: 3, cartQty: '3', status: "active"},
  ],
  profile: {
    id: 1,
    firstname: 'Akano',
    lastname: 'Peter',
    email: 'elkenzom1@gmail.com',
    role: 'admin',
    image: 'team-7.jpg',
  },
};


const mockStore = configureStore([thunk]);

const store = mockStore({ ...props });



describe('Cart Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<Cart {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
          <Cart {...props} />
          </MemoryRouter>
        </Provider>,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('triggers handleQuantityChange()', () => {
      const CartComp = wrapper.find('Cart')
      sinon.spy(CartComp.instance(), 'handleQuantityChange');

      CartComp.instance().handleQuantityChange({
        currentTarget:{dataset:{itemid: 2}},
        target:{value:'Hiii Book'}
      });
      expect(CartComp.instance().handleQuantityChange.calledOnce)
        .toEqual(true);
    });


    it('triggers handleRemoveFromCart()', () => {
      const CartComp = wrapper.find('Cart');

      sinon.spy(CartComp.instance(), 'handleRemoveFromCart');

      CartComp.instance().handleRemoveFromCart(1);
      expect(CartComp.instance().handleRemoveFromCart.calledOnce)
        .toEqual(true);

      // const button = CartComp.find('button').last();
      // button.simulate('click', 1);
    });


    it('triggers handleSubmit()', () => {
      const CartComp = wrapper.find('Cart');

      sinon.spy(CartComp.instance(), 'handleSubmit');
      CartComp.instance().handleSubmit({preventDefault: () => {}});
      expect(CartComp.instance().handleSubmit.calledOnce)
        .toEqual(true);
    });
  });
});
