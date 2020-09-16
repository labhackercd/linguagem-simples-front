import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow, mount} from "enzyme/build";
import ReactDOM from "react-dom";
import URLInputDialog from './index.js';

it("snapshot should not have differences", () => {
    const component = shallow(<URLInputDialog URLInputDialogOpen={true}/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test('Test if Feed renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<URLInputDialog URLInputDialogOpen={true} />, div)
    ReactDOM.unmountComponentAtNode(div)
});
