import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import GlossarioContent from './glossario'

it("should render the GlossarioContent section", () => {
    const component = shallow(<GlossarioContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
