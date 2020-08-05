import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../index.js';
import Sidebar from '../../../components/Dashboard/Sidebar';
import Timeline from '../../../components/Dashboard/Timeline';
import Content from '../../../components/Dashboard/Content';

import {shallow} from "enzyme/build";

it("renders dashboard", () => {
    const component = shallow(<Dashboard/>);

    const sidebar = component.find(Sidebar);
    const timeline = component.find(Timeline);
    const content = component.find(Content);

    expect(sidebar.exists()).toEqual(true);
    expect(timeline.exists()).toEqual(true);
    expect(content.exists()).toEqual(true);
});
