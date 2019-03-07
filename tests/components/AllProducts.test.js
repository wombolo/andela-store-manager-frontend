import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';


import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { AllProducts } from '../../src/components/AllProducts.jsx';

let wrapper;

const props = {
  getAllProducts: () => Promise.resolve(),
  addToCart: () => Promise.resolve(),
  products: {
    products: [
      {id: 5, title: "Bonjour", image: "products/product-5.png",price: "150.00", quantity: 3, status: "active"},
      {id: 2, title: "Bonjour", image: "products/product-5.png",price: "150.00", quantity: 3, status: "active"},
    ]
  }
};


const mockStore = configureStore([thunk]);

const store = mockStore({ ...props });




describe('AllProducts Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<AllProducts {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
          <AllProducts {...props} />
          </MemoryRouter>
        </Provider>,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('triggers addToCart()', () => {
      const AllProductsComp = wrapper.find('AllProducts')
      sinon.spy(AllProductsComp.instance(), 'addToCartEvt');

      AllProductsComp.instance().addToCartEvt(props.products.products[0]);
      expect(AllProductsComp.instance().addToCartEvt.calledOnce)
        .toEqual(true);

      const button = AllProductsComp.find('button').last();
      button.simulate('click', props.products.products[0]);
    });

  });
});
