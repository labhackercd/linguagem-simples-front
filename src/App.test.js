import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Hello world/i);
  expect(linkElement).toBeInTheDocument();
});


const add = (a, b) => a + b;
test('should add two numbers', () => {
 const sum = add(3, 4);
 expect(sum).toBe(7);
});