import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { ViewModifyProduct } from '../../src/components/ViewModifyProduct.jsx';

global.confirm = () => true;


let wrapper;

const props = {
  match:{ params: 2},
  getSingleProducts: () => (
    {
      product: {id: 2, title: "Bonjour", image: "products/product-5.png",price: 150, quantity: 3, ViewModifyProductQty: '3', status: "active"}}
    ),

  addToCart: () => Promise.resolve(),
  editProduct: () => Promise.resolve(),
  deleteProduct: () => Promise.resolve(),
  product: {
    id: 2, title: "Bonjour", image: "products/product-5.png",price: 150, quantity: 3, ViewModifyProductQty: '3', status: "active"
  },

  profile: {
    id: 1, firstname: 'Akano', lastname: 'Peter',
    email: 'elkenzom1@gmail.com', role: 'admin', image: 'team-7.jpg',
  },
};


const mockStore = configureStore([thunk]);

const store = mockStore({ ...props });


describe('ViewModifyProduct Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<ViewModifyProduct {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
          <ViewModifyProduct {...props} />
          </MemoryRouter>
        </Provider>,
    );
      // const ViewModifyProductComp = wrapper.find('ViewModifyProduct');

    });

    afterEach(() => {
      wrapper.unmount();
    });


    it('triggers handleSubmit() in ViewModifyProductComp', () => {
      const ViewModifyProductComp = wrapper.find('ViewModifyProduct');
      sinon.spy(ViewModifyProductComp.instance(), 'handleSubmit');

      ViewModifyProductComp.instance().handleSubmit({preventDefault: () => {}});
      expect(ViewModifyProductComp.instance().handleSubmit.calledOnce)
        .toEqual(true);
    });


    it('triggers handleChange() for input title and onClick() for button addtocart', () => {
      const wrapperNew = shallow(<ViewModifyProduct {...props} />);
      wrapperNew.setProps({product: props.product});

      const ViewModifyProductComp = wrapper.find('ViewModifyProduct');

      const file = {lastModified: 1547454659333,
        lastModifiedDate: 'Mon Jan 14 2019 09:30:59 GMT+0100 (West Africa Standard Time) {}',
        name: "15158524_xl.jpg",
        size: 3734559,
        type: "image/jpeg",
        webkitRelativePath: ""};

      const image_file = ViewModifyProductComp.find('#image_file').first();
      image_file.simulate('change', { target: { files: [file] , id: 'image_file'} });


      const buttonCartAdd = ViewModifyProductComp.find('button').last();
      buttonCartAdd.simulate('click',{});


      sinon.spy(ViewModifyProductComp.instance(), 'handleChange');
      ViewModifyProductComp.instance().handleChange({target: { value: 'u' , id: 'title'} });
      expect(ViewModifyProductComp.instance().handleChange.calledOnce)
        .toEqual(true);
    });


    it('triggers handleDeleteProduct() in ViewModifyProductComp', () => {

      const ViewModifyProductComp = wrapper.find('ViewModifyProduct');
      sinon.spy(ViewModifyProductComp.instance(), 'handleDeleteProduct');
      ViewModifyProductComp.instance().handleDeleteProduct(1);
      expect(ViewModifyProductComp.instance().handleDeleteProduct.calledOnce)
        .toEqual(true);
    });


    it('triggers handleSubmit() in ViewModifyProductComp for non-admin ', () => {
      props.profile.role='store_attendant';
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <ViewModifyProduct {...props} />
          </MemoryRouter>
        </Provider>,
      );

      const ViewModifyProductComp = wrapper.find('ViewModifyProduct');

      const buttonCartAdd = ViewModifyProductComp.find('button').last();
      buttonCartAdd.simulate('click',{});


      sinon.spy(ViewModifyProductComp.instance(), 'handleSubmit');

      ViewModifyProductComp.instance().handleSubmit({preventDefault: () => {}});
      expect(ViewModifyProductComp.instance().handleSubmit.calledOnce)
        .toEqual(true);
    });

  });
});
