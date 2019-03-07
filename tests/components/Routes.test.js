import 'babel-polyfill'
import React from 'react';
import { shallow } from 'enzyme';

import Routes from '../../src/components/Routes.jsx';

let wrapper;


describe('Routes Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});
