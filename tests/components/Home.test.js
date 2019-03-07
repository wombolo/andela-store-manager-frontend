import 'babel-polyfill'
import React from 'react';
import { shallow } from 'enzyme';

import Home  from '../../src/components/Home.jsx';

let wrapper;

describe('Home Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
