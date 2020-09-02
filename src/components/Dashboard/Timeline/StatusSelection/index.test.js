import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusSelection from './index';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';

it("should render the status selection section", () => {
    const component = shallow(<StatusSelection/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test('does status selection button exists', () => {
    const wrapper = mount(<StatusSelection />);
    const statusButton = wrapper.find("button").at(0);
    expect(wrapper.find("button").length).toEqual(7);
});
