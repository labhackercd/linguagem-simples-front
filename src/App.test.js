import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'


test('Test if app render properly learn react link', () => {
  const div = document.createElement("div")
  ReactDOM.render(<App></App>, div)
  ReactDOM.unmountComponentAtNode(div)
});
