import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../../../components/Dashboard/Sidebar';
import Timeline from '../../../components/Dashboard/Timeline';
import Content from '../../../components/Dashboard/Content';
import { Route, MemoryRouter } from 'react-router-dom'
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer';

import {shallow} from "enzyme/build";

import Dashboard from '../index.js'

/* todo: implement tests with useParams() hook */
it('renders Dashboard', () => {})

/*
test('Test if Dashboard renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<Dashboard></Dashboard>, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('Test if SessionHistoryComponent snapshot matches', () => {
    const component = renderer.create(
        <Dashboard></Dashboard>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
*/