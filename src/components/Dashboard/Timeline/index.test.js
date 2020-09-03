import React from 'react';
import { screen } from '@testing-library/react';
import {shallow, render} from "enzyme";
import Timeline from './index';
import Header from './Header';
import StatusSelection from './StatusSelection';
import NewUpdate from './NewUpdate';
import Feed from './Feed';
import SummaryBox from './SummaryBox';
import ReactDOM from 'react-dom';

it("snapshot should not have differences", () => {
    const component = shallow(<Timeline/>);
    expect(component).toMatchSnapshot();
});

test('Test if Timeline renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<Timeline></Timeline>, div)
    ReactDOM.unmountComponentAtNode(div)
});
