import 'babel-polyfill'
import React from 'react';
import { shallow } from 'enzyme';

import NotFound  from '../../src/components/NotFound.jsx';

let wrapper;

const props = {
  location:{pathname: '/not-found-link'}
};

describe('NotFound Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<NotFound {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
