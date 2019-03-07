import 'babel-polyfill'
import React from 'react';
import { shallow } from 'enzyme';

import Dashboard  from '../../src/components/Dashboard.jsx';

let wrapper;

describe('Dashboard Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
