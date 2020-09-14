import React from 'react'
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import EstudioAcompanhePageContainer from './../index'
import renderer from 'react-test-renderer';
import NewSessionFormComponent from '../../../components/EstudioAcompanhePageComponents/NewSessionFormComponent'
import SessionHistoryComponent from '../../../components/EstudioAcompanhePageComponents/SessionHistoryComponent'

import {shallow} from "enzyme/build";

it("Does NewSessionFormComponent component renders properly", () => {
    const component = shallow(<EstudioAcompanhePageContainer/>);

    const content = component.find(NewSessionFormComponent)
    expect(content.exists()).toEqual(true);
});
/*
it("Does SessionHistoryComponent component renders properly", () => {
    const component = shallow(<EstudioAcompanhePageContainer/>);

    const content = component.find(SessionHistoryComponent)
    expect(content.exists()).toEqual(true);
});

test('Test if SessionHistoryComponent renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<EstudioAcompanhePageContainer></EstudioAcompanhePageContainer>, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('Test if SessionHistoryComponent renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<EstudioAcompanhePageContainer></EstudioAcompanhePageContainer>, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('Test if NewSessionFormComponent renders local text properly', () => {
    const { getByText } = render(<EstudioAcompanhePageContainer />);
    const linkElement = getByText(/Local/i);
    expect(linkElement).toBeInTheDocument();
});

test('Test if Input exists from NewSessionFormComponent exists ', () => {
    const { getByText } = render(<EstudioAcompanhePageContainer />);
    const linkElement = getByText(/Nova sessão/i);
    expect(linkElement).toBeInTheDocument();
});

test('Test if SessionHistoryComponent snapshot matches', () => {
    const component = renderer.create(
        <EstudioAcompanhePageContainer></EstudioAcompanhePageContainer>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

*/
