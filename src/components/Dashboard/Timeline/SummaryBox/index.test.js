import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryBox from './index';
import {shallow} from "enzyme/build";

it("should render the summary box section", () => {
    const component = shallow(<SummaryBox/>);
    expect(component).toMatchSnapshot();
});
