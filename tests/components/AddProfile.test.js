import 'babel-polyfill'
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { AddProfile } from '../../src/components/AddProfile.jsx';

let wrapper;

const props = {
  addNewProfile: () => null,
};


describe('AddProduct Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<AddProfile {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Methods in Class', () => {

    beforeEach(() => {
      // store = createStore(combineReducers({}));
      wrapper = mount(<AddProfile {...props}/>);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('triggers handleSubmit()', () => {
      // const image_file = wrapper.find('form').last();
      // image_file.simulate('submit', {preventDefault: () => {}});

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

    it('triggers handleChange() for image input', () => {
      const file = {lastModified: 1547454659333,
      lastModifiedDate: 'Mon Jan 14 2019 09:30:59 GMT+0100 (West Africa Standard Time) {}',
      name: "15158524_xl.jpg",
      size: 3734559,
      type: "image/jpeg",
      webkitRelativePath: ""};

      const image = wrapper.find('#image').last();
      image.simulate('change', { target: { files: [file] , id: 'image'} });
    });

  });
});
