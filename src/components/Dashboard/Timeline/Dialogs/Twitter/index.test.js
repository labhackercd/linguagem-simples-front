import React from 'react';
import { render, screen } from '@testing-library/react';
import TwitterDialog from './index';
import {shallow} from "enzyme/build";

it("should render the Twitter Dialog", () => {
    const component = shallow(<TwitterDialog/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
