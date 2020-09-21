import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewUpdate from './index';
import {shallow, mount } from "enzyme/build";
import ReactDOM from 'react-dom';

it("snapshot should not have differences", () => {
    const component = shallow(<NewUpdate/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test('Test if NewUpdate renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<NewUpdate></NewUpdate>, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('does internal elements exists', () => {
    const wrapper = mount(<NewUpdate/>);
    const button = wrapper.find("#updateSubmitButton").at(0);
    const textField = wrapper.find("#newUpdateTextField").at(0);
    expect(button).not.toBeNull();
    expect(textField).not.toBeNull();
    wrapper.unmount();
});
