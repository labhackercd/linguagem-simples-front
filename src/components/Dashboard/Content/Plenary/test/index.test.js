import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import PlenaryPanel from '../index.js'


it("should render the PlenaryPanel component, match snapshot and test lifeclycle", () => {
    const component = mount(<PlenaryPanel sessionIdDadosAbertos={1}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();

    const attendanceTab = component.find("#attendanceTab").find("button");
    attendanceTab.simulate('click');
    
    const votationTab = component.find("#votationTab").find("button");
    votationTab.simulate('click');


});


it("should render the PlenaryPanel message of not syncronized session", () => {
    const component = mount(<PlenaryPanel sessionIdDadosAbertos={null}/>);

    expect(component.exists()).toEqual(true);
    expect(component.text()).toMatch(/Dados/i)


});


