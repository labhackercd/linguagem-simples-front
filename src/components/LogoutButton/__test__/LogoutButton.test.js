import React from 'react'
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import LogoutButton from './../index'
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


test('Test if LogoutButton renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<LogoutButton></LogoutButton>, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('Test if LogoutButton renders local text properly', () => {
    const { getByText } = render(<LogoutButton />);
    const linkElement = getByText(/sair/i);
    expect(linkElement).toBeInTheDocument();
});

test('Test if LogoutButton snapshot matches', () => {
    const component = renderer.create(
        <LogoutButton></LogoutButton>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Test if Logout get called succesfull", async () => {
    
    //var mockInstance = new MockAdapter(axiosInstance);
    const data = {
      "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5ODQ3MTU4NywianRpIjoiMzU1NGVhZmNkYzk0NDViN2E1M2I2ODcwNjY2ZWRkZGEiLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImpwbnNvYXJlcyJ9.Hxm2M6aPDWIeripot0bNwYi1FoIHcACbM0gkjOGjVxE",
      "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk3MjYyMjg3LCJqdGkiOiJlN2Q1YThlYTI2ODQ0MzI4YmM4MzAyOWUyYjIwMGFmNSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoianBuc29hcmVzIn0.f-iNNn7cOZwOSHQc61RL2lXBjtuSUWdIp1vPTU6T9gc"
    };
    
    const button = mount(<LogoutButton/>);

    button.simulate('click')
    //expect(localStorage.setItem).toHaveBeenCalled();
  });
  