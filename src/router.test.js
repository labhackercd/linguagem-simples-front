import React from 'react'
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import AppRouter from './router.js'
import renderer from 'react-test-renderer';
import {shallow} from "enzyme/build";
import Dashboard from "./containers/DashboardContainer";



test('Test if AppRouter renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<AppRouter></AppRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
});

it("renders dashboard at approuter", () => {
    const component = shallow(<AppRouter/>);

    const dashboard = component.find(Dashboard);

    expect(dashboard.exists()).toEqual(true);

});