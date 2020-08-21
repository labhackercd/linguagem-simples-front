import React from 'react';
import {shallow} from "enzyme/build";
import TvCamaraContent from './tvCamara'

it("should render the TVCamaraContent section", () => {
    const component = shallow(<TvCamaraContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
