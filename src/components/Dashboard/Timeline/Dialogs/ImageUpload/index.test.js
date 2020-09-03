import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageUploadDialog from './index';
import {shallow} from "enzyme/build";

it("should render the content section", () => {
    const component = shallow(<ImageUploadDialog/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
