import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import VideoSnippets from './videoSnippets'

it("should render the VideoSnippets section", () => {
    const component = shallow(<VideoSnippets/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
