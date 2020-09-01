import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusSelection from './index';
import {shallow} from "enzyme/build";

it("should render the status selection section", () => {
    const component = shallow(<StatusSelection/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
