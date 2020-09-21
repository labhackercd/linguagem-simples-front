import React from 'react';
import { render, screen, getByPlaceholderText } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import LoginScreen from '../index';
import axiosInstance from '../../../auth/axiosApi'
import {responseData} from './auxTestResponse'
import MockAdapter from "axios-mock-adapter"
import {TOKEN_OBTAIN_URL} from '../../../api_urls'

describe('Test Fields', () => {
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
  
});


describe('Test Login Lifecycle', () => {

  test("Test if login function get called sucessfully", async () => {
    
      var mockInstance = new MockAdapter(axiosInstance);
      const data = {
        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
        "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
      };

      await mockInstance.onPost(TOKEN_OBTAIN_URL).replyOnce(200,data)
      
      const  wrapper = mount(<LoginScreen />);
      console.log(wrapper.debug())
      const usernameField = wrapper.find("input").at(0);
      console.log(usernameField.debug())
      usernameField.instance().value = "LABHacker";
      usernameField.simulate("change");
      const passwordField = wrapper.find("input").at(1);
      passwordField.instance().value = "LABHacker";
      passwordField.simulate("change");
      const button = wrapper.find("button").at(0);
      console.log(button.debug())

      button.simulate('click')
      //expect(localStorage.setItem).toHaveBeenCalled();
  });


  test("Test if login function get called sucessfully", async () => {
    
    var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };

    await mockInstance.onPost(TOKEN_OBTAIN_URL).replyOnce(201,data)
    
    const  wrapper = mount(<LoginScreen />);
    console.log(wrapper.debug())
    const usernameField = wrapper.find("input").at(0);
    console.log(usernameField.debug())
    usernameField.instance().value = "LABHacker";
    usernameField.simulate("change");
    const passwordField = wrapper.find("input").at(1);
    passwordField.instance().value = "LABHacker";
    passwordField.simulate("change");
    const button = wrapper.find("button").at(0);
    console.log(button.debug())

    button.simulate('click')
    //expect(localStorage.setItem).toHaveBeenCalled();
});

  test("Test if login function get called 401 error", async () => {
    
    var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };

    await mockInstance.onPost(TOKEN_OBTAIN_URL).replyOnce(401,data)
    
    const  wrapper = mount(<LoginScreen />);
    console.log(wrapper.debug())
    const usernameField = wrapper.find("input").at(0);
    console.log(usernameField.debug())
    usernameField.instance().value = "LABHacker";
    usernameField.simulate("change");
    const passwordField = wrapper.find("input").at(1);
    passwordField.instance().value = "LABHacker";
    passwordField.simulate("change");
    const button = wrapper.find("button").at(0);
    console.log(button.debug())

    button.simulate('click')
    //expect(localStorage.setItem).toHaveBeenCalled();
  });

  test("Test if login function get error called when server is down", async () => {
    
    //var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };
    
    const  wrapper = mount(<LoginScreen />);
    console.log(wrapper.debug())
    const usernameField = wrapper.find("input").at(0);
    console.log(usernameField.debug())
    usernameField.instance().value = "LABHacker";
    usernameField.simulate("change");
    const passwordField = wrapper.find("input").at(1);
    passwordField.instance().value = "LABHacker";
    passwordField.simulate("change");
    const button = wrapper.find("button").at(0);
    console.log(button.debug())

    button.simulate('click')
    //expect(localStorage.setItem).toHaveBeenCalled();
  });
  
});



