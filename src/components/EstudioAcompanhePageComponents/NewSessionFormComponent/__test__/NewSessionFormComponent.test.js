import React from 'react'
import {cleanup, fireEvent, render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import NewSessionFormComponent from './../index'
import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    // Tip: all queries are also exposed on an object
    // called "queries" which you could import here as well
    waitFor,
  } from '@testing-library/dom'
import renderer from 'react-test-renderer';




test('Test if NewSessionFormComponent renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<NewSessionFormComponent></NewSessionFormComponent>, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('Test if NewSessionFormComponent renders local text properly', () => {
    const { getByText } = render(<NewSessionFormComponent />);
    const linkElement = getByText(/Local/i);
    expect(linkElement).toBeInTheDocument();
});

test('Test if Input exists', () => {
    const { getByText } = render(<NewSessionFormComponent />);
    const linkElement = getByText(/Nova sessão/i);
    expect(linkElement).toBeInTheDocument();
});

test('Test if NewSessionFormComponent snapshot matches', () => {
    const component = renderer.create(
        <NewSessionFormComponent></NewSessionFormComponent>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


/*
it('Test if components matches snapshot', () => {  
    const TextInputComponent = renderercreate(<NewSessionFormComponent />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});
*/
