import React from 'react';
import {shallow} from "enzyme/build";
import RadioCamaraContent from './radioCamara'

it("should render the RadioCamaraContent section", () => {
    const component = shallow(<RadioCamaraContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
