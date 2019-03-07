import 'babel-polyfill'
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { AllSales } from '../../src/components/AllSales.jsx';

let wrapper;

const props = {
  getAllSales: () => Promise.resolve(),
  sales:{
    sales:[
      {"id":1,"product_id":2,"profile_id":1,"title":"Things fall apart","description":"Book written by Chinua Achebe","price":"42.00","quantity":3,"cdate":"2018-10-31T21:40:17.871Z"},
      {"id":2,"product_id":2,"profile_id":1,"title":"Things fall apart","description":"Book written by Chinua Achebe","price":"42.00","quantity":3,"cdate":"2018-10-31T21:54:18.169Z"},
      {"id":3,"product_id":2,"profile_id":1,"title":"Things fall apart","description":"Book written by Chinua Achebe","price":"42.00","quantity":3,"cdate":"2018-10-31T21:57:29.032Z"},
    ]
  },
  profile: {
    id: 1,
    firstname: 'Akano',
    lastname: 'Peter',
    email: 'elkenzom1@gmail.com',
    role: 'admin',
    image: 'team-7.jpg',
  },
};

describe('AllSales Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<AllSales {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
