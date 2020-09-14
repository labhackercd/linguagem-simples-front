import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import TwitterDeputadosContent from './twitterDeputados'

it("should render the TwitterDeputados section", () => {
    const component = shallow(<TwitterDeputadosContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
