import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './index';
import {shallow} from "enzyme/build";

it("should render the content section", () => {
    const component = shallow(<Content/>);
    expect(component).toMatchSnapshot();
});
