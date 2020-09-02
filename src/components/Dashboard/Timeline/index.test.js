import React from 'react';
import { screen } from '@testing-library/react';
import {shallow, render} from "enzyme";
import Timeline from './index';
import Header from './Header';
import StatusSelection from './StatusSelection';
import NewUpdate from './NewUpdate';
import Feed from './Feed';
import SummaryBox from './SummaryBox';

it("should render the timeline section", () => {
    const component = shallow(<Timeline/>);
    expect(component).toMatchSnapshot();
});
