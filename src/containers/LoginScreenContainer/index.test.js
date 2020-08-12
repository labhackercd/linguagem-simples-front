import React from 'react';
import { render, screen, getByPlaceholderText } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import LoginScreen from '../LoginScreenContainer';


test('renders forgot password link', () => {
  const { getByText } = render(<LoginScreen />);
  const linkElement = getByText('Esqueci a senha');
  expect(linkElement).toBeInTheDocument();
});

test('renders login button', () => {
  const { getByText } = render(<LoginScreen />);
  const linkElement = getByText('Acessar');
  expect(linkElement).toBeInTheDocument();
});

test('renders username field', () => {
  const { getByPlaceholderText } = render(<LoginScreen />);
  const linkElement = getByPlaceholderText('email');
  expect(linkElement).toBeInTheDocument();
});

test('renders password field', () => {
  const { getByPlaceholderText } = render(<LoginScreen />);
  const linkElement = getByPlaceholderText('senha');
  expect(linkElement).toBeInTheDocument();
});
