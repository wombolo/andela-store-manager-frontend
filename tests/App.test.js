import React from 'react';
import ReactDOM from 'react-dom';
import FormContainer from "../src/js/containers/FormContainer.jsx";


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
