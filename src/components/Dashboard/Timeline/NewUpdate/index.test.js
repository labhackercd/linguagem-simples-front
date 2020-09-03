import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewUpdate from './index';
import {shallow } from "enzyme/build";
import ReactDOM from 'react-dom';

it("snapshot should not have differences", () => {
    const component = shallow(<NewUpdate/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test('Test if NewUpdate renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<NewUpdate></NewUpdate>, div)
    ReactDOM.unmountComponentAtNode(div)
});


test('does status selection button exists', () => {
    const { getByText } = render(<NewUpdate />);
    const textAreaLabel = getByText('Nova atualização');
    expect(textAreaLabel).toBeInTheDocument();
});
