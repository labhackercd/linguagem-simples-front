import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';
import {shallow} from "enzyme/build";

it("should render the Header section", () => {
    const component = shallow(<Header/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
