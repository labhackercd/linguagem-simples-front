import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import StatusSelection from './index';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';

it("snapshot should not have changes", () => {
    const component = shallow(<StatusSelection/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test('Test if StatusSelection renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<StatusSelection></StatusSelection>, div)
    ReactDOM.unmountComponentAtNode(div)
});


test('does status selection button exists', () => {
    const wrapper = mount(<StatusSelection />);
    const statusButton = wrapper.find("button").at(0);
    expect(wrapper.find("button").length).toEqual(7);
});
