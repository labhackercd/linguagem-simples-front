import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import RadioCamaraContent from './radioCamara'

it("should render the AgenciaCamaraContent section", () => {
    const component = shallow(<RadioCamaraContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
