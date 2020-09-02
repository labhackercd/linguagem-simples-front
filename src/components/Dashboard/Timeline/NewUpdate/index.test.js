import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewUpdate from './index';
import {shallow} from "enzyme/build";

it("should render the new update section", () => {
    const component = shallow(<NewUpdate/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
}); 
