import React from 'react';
import { render} from '@testing-library/react';
import { mount } from 'enzyme';
import LoginScreen from '../index';
import axiosInstance from '../../../auth/axiosApi'
import MockAdapter from "axios-mock-adapter"
import {TOKEN_OBTAIN_URL, TOKEN_VERIFY_URL} from '../../../api_urls'
import { BrowserRouter as Router } from 'react-router-dom';


describe('Test Login Lifecycle', () => {

  test("Test if login function get called sucessfully", async () => {
    
      var mockInstance = new MockAdapter(axiosInstance);
      const data = {
        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
        "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
      };

      await mockInstance.onPost(TOKEN_VERIFY_URL).reply(401)
                        .onPost(TOKEN_OBTAIN_URL).reply(200,data)
      
      const  wrapper = mount(<Router><LoginScreen/></Router>);
      //console.log(wrapper.debug())
      const emailField = wrapper.find("input").at(0);
      //console.log(emailField.debug())
      emailField.instance().value = "LABHacker";
      emailField.simulate("change");
      const passwordField = wrapper.find("input").at(1);
      passwordField.instance().value = "LABHacker";
      passwordField.simulate("change");
      const button = wrapper.find("button").at(0);
      //console.log(button.debug())

      button.simulate('click')
      //expect(localStorage.setItem).toHaveBeenCalled();
  });

  test("Test if login function get called sucessfully", async () => {
    
    var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };

    await mockInstance.onPost(TOKEN_VERIFY_URL).reply(401)
                      .onPost(TOKEN_OBTAIN_URL).reply(200,data)
    
    const  wrapper = mount(<Router><LoginScreen/></Router>);
    //console.log(wrapper.debug())
    const emailField = wrapper.find("input").at(0);
    //console.log(emailField.debug())
    emailField.instance().value = "LABHacker";
    emailField.simulate("change");
    const passwordField = wrapper.find("input").at(1);
    passwordField.instance().value = "LABHacker";
    passwordField.simulate("change");
    const button = wrapper.find("button").at(0);
    //console.log(button.debug())

    button.simulate('click')
    //expect(localStorage.setItem).toHaveBeenCalled();
  });
 
  test("Test if login function get called sucessfully but email or password is wrong", async () => {
    
    var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };

    await mockInstance.onPost(TOKEN_VERIFY_URL).reply(400)
                      .onPost(TOKEN_OBTAIN_URL).reply(401, data)
    
    const  wrapper = await mount(<Router><LoginScreen/></Router>);
    //console.log(wrapper.debug())
    const emailField = wrapper.find("input").at(0);
    //console.log(emailField.debug())
    emailField.instance().value = "LABHacker";
    emailField.simulate("change");
    const passwordField = wrapper.find("input").at(1);
    passwordField.instance().value = "LABHacker";
    passwordField.simulate("change");
    const button = wrapper.find("button").at(0);
    //console.log(button.debug())

    button.simulate('click')
    //expect(localStorage.setItem).toHaveBeenCalled();
  });

  test("Test if user is redirect when already logged", async () => {
    
    var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };

    await mockInstance.onPost(TOKEN_VERIFY_URL).reply(200)
                      .onPost(TOKEN_OBTAIN_URL).reply(401, data)
    
    const  wrapper = await mount(<Router><LoginScreen/></Router>);

  });

  test("Test if user is not redirect when not logged", async () => {
    
    var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };

    await mockInstance.onPost(TOKEN_VERIFY_URL).reply(400)
    
    const  wrapper = await mount(<Router><LoginScreen/></Router>);

  });

  test("Test if login function get called 401 error", async () => {
    
    var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };

    await mockInstance.onPost(TOKEN_VERIFY_URL).reply(401)
                      .onPost(TOKEN_OBTAIN_URL).reply(401)
    
    const  wrapper = await mount(<Router><LoginScreen/></Router>);
    //console.log(wrapper.debug())
    const emailField = wrapper.find("input").at(0);
    //console.log(emailField.debug())
    emailField.instance().value = "LABHacker";
    emailField.simulate("change");
    const passwordField = wrapper.find("input").at(1);
    passwordField.instance().value = "LABHacker";
    passwordField.simulate("change");
    const button = wrapper.find("button").at(0);
    //console.log(button.debug())

    button.simulate('click')
    //expect(localStorage.setItem).toHaveBeenCalled();
  });
  
  test("Test if login function get error called when server is down", async () => {
    
    //var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };
    
    const  wrapper = await mount(<Router><LoginScreen/></Router>);
    //console.log(wrapper.debug())
    const emailField = wrapper.find("input").at(0);
    //console.log(emailField.debug())
    emailField.instance().value = "LABHacker";
    emailField.simulate("change");
    const passwordField = wrapper.find("input").at(1);
    passwordField.instance().value = "LABHacker";
    passwordField.simulate("change");
    const button = wrapper.find("button").at(0);
    //console.log(button.debug())

    button.simulate('click')

    setImmediate(() => {
      wrapper.update();
      //console.log(wrapper.debug())
      //Add later a expect to check if modal os response has been triggered

   })
    //expect(localStorage.setItem).toHaveBeenCalled();
  
  });
  

});



