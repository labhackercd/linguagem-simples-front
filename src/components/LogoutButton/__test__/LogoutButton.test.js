import React from 'react'
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import LogoutButton from './../index'
import renderer from 'react-test-renderer';



test('Test if LogoutButton renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<LogoutButton></LogoutButton>, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('Test if LogoutButton renders local text properly', () => {
    const { getByText } = render(<LogoutButton />);
    const linkElement = getByText(/sair/i);
    expect(linkElement).toBeInTheDocument();
});

test('Test if LogoutButton snapshot matches', () => {
    const component = renderer.create(
        <LogoutButton></LogoutButton>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
