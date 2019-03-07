import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { ViewModifyProfile } from '../../src/components/ViewModifyProfile.jsx';

global.confirm = () => true;


let wrapper;

const props = {
  match:{ params: 1},
  getSingleProfile: () => (
    {
      product: {id: 2, title: "Bonjour", image: "products/product-5.png",price: 150, quantity: 3, ViewModifyProfileQty: '3', status: "active"}}
    ),

  editProfile: () => Promise.resolve(),

  authProfile: {
    id: 1, firstname: 'Akano', lastname: 'Peter',
    email: 'elkenzom1@gmail.com', role: 'admin', image: 'team-7.jpg',
  },

  profile: {
    id: 1, firstname: 'Akano', lastname: 'Peter',
    email: 'elkenzom1@gmail.com', role: 'admin', image: 'team-7.jpg',
  },
};


const mockStore = configureStore([thunk]);

const store = mockStore({ ...props });


describe('ViewModifyProfile Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<ViewModifyProfile {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
          <ViewModifyProfile {...props} />
          </MemoryRouter>
        </Provider>,
    );
    });

    afterEach(() => {
      wrapper.unmount();
    });


    it('triggers handleSubmit() in ViewModifyProfileComp', () => {
      const ViewModifyProfileComp = wrapper.find('ViewModifyProfile');
      sinon.spy(ViewModifyProfileComp.instance(), 'handleSubmit');

      ViewModifyProfileComp.instance().handleSubmit({preventDefault: () => {}});
      expect(ViewModifyProfileComp.instance().handleSubmit.calledOnce)
        .toEqual(true);
    });


    it('triggers handleChange() for input title', () => {
      const wrapperNew = shallow(<ViewModifyProfile {...props} />);
      wrapperNew.setProps({product: props.product});

      const ViewModifyProfileComp = wrapper.find('ViewModifyProfile');

      const file = {lastModified: 1547454659333,
        lastModifiedDate: 'Mon Jan 14 2019 09:30:59 GMT+0100 (West Africa Standard Time) {}',
        name: "15158524_xl.jpg",
        size: 3734559,
        type: "image/jpeg",
        webkitRelativePath: ""};

      const image_file = ViewModifyProfileComp.find('#image_file').first();
      image_file.simulate('change', { target: { files: [file] , id: 'image_file'} });

      sinon.spy(ViewModifyProfileComp.instance(), 'handleChange');
      ViewModifyProfileComp.instance().handleChange({target: { value: 'u' , id: 'title'} });

      expect(ViewModifyProfileComp.instance().handleChange.calledOnce)
        .toEqual(true);
    });

  });
});
