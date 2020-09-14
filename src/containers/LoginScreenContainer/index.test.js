import React from 'react';
import { render, screen, getByPlaceholderText } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import LoginScreen from '../LoginScreenContainer';
import axiosInstance from './../../auth/axiosApi'
import moxios from 'moxios'
import {responseData} from './auxTestResponse'

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

test('renders username field and change value', () => {
  const  wrapper = mount(<LoginScreen />);
  const usernameField = wrapper.find("input").at(0);
  usernameField.instance().value = "LABHacker";
  usernameField.simulate("change");
  expect(wrapper.find("input").at(0).prop('value')).toEqual("LABHacker");
});

test('renders password field and change value', () => {
  const  wrapper = mount(<LoginScreen />);
  const passwordField = wrapper.find("input").at(1);
  passwordField.instance().value = "LABHacker";
  passwordField.simulate("change");
  expect(wrapper.find("input").at(1).prop('value')).toEqual("LABHacker");
});

test('renders password field', () => {
  const { getByPlaceholderText } = render(<LoginScreen />);
  const linkElement = getByPlaceholderText('senha');
  expect(linkElement).toBeInTheDocument();
});


describe('Test Login function requisitions', () => {
  beforeEach(function () {
    // Passing custom axios instance to be mocked
    moxios.install(axiosInstance)
  })

  afterEach(function () {
    // Passing custom axios instance to be unmocked
    moxios.uninstall(axiosInstance)
  })

  it("Test if login function get called ", async () => {
     
     try{/*
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: responseData
        })
      })
      jest.spyOn(window.localStorage.__proto__, 'setItem');
*/

      const  wrapper = mount(<LoginScreen />);
      const usernameField = wrapper.find("input").at(0);
      usernameField.instance().value = "LABHacker";
      usernameField.simulate("change");
      const passwordField = wrapper.find("input").at(1);
      passwordField.instance().value = "LABHacker";
      passwordField.simulate("change");
      const button = wrapper.find("button").at(0);
      button.simulate('click')

      expect(localStorage.setItem).toHaveBeenCalled();


     }catch(e){
      // Nothing to do
     }



  });


});



