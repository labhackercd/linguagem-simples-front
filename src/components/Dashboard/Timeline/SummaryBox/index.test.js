import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryBox from './index';
import {shallow} from "enzyme/build";
import ReactDOM from 'react-dom';

it("snapshot should not have differences", () => {
    const component = shallow(<SummaryBox/>);
    expect(component).toMatchSnapshot();
});

test('Test if SummaryBox renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<SummaryBox></SummaryBox>, div)
    ReactDOM.unmountComponentAtNode(div)
});


test('does "resumo" label gets rendered', () => {
    const { getByText } = render(<SummaryBox />);
    const textAreaLabel = getByText('Resumo');
    expect(textAreaLabel).toBeInTheDocument();
});
