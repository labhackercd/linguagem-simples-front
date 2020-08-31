import React from 'react';
import { render, screen } from '@testing-library/react';
import TitleRow from './index';
import {shallow} from "enzyme/build";

it("should render the Title Row section", () => {
    const component = shallow(<TitleRow/>);
    expect(component).toMatchSnapshot();
});
