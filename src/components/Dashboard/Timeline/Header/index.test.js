import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';
import {shallow} from "enzyme/build";
import ReactDOM from 'react-dom';

it("snapshot should not have differences", () => {
    const component = shallow(<Header/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test('Test if Header renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<Header></Header>, div)
    ReactDOM.unmountComponentAtNode(div)
});


test('does "linha do tempo" label exists', () => {
    const { getByText } = render(<Header />);
    const textAreaLabel = getByText('Linha do Tempo');
    expect(textAreaLabel).toBeInTheDocument();
});
