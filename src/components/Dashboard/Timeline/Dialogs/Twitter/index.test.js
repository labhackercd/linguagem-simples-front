import React from 'react';
import { render, screen } from '@testing-library/react';
import TwitterDialog from './index';
import {shallow, mount} from "enzyme/build";
import ReactDOM from "react-dom";

it("snapshot should not have differences", () => {
    const component = shallow(<TwitterDialog/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
