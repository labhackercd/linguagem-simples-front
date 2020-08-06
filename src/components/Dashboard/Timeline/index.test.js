import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from './index';
import TitleRow from '../TitleRow';
import Update from '../Update';
import {shallow} from "enzyme/build";

it("should render the content section", () => {
    const component = shallow(<Timeline/>);
    const titleRow = component.find(TitleRow);
    const update = component.find(Update);

    expect(titleRow.exists()).toEqual(true);
    expect(update.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
