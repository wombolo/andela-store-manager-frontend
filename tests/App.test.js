import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App.jsx';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<App />);
});

describe('App Component', () => {
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  })
});

