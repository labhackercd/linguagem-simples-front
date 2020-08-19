import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import AgenciaCamaraContent from './agenciaCamara'

it("should render the AgenciaCamaraContent section", () => {
    const component = shallow(<AgenciaCamaraContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
