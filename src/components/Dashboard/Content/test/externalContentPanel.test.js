import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import ExternalContentPanel from '../externalContentPanel.js'


it("should render the PlenaryPanel component, match snapshot and test lifeclycle", () => {
    const component = mount(<ExternalContentPanel sessionIdDadosAbertos={1}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();

    const agenciaCamaraContentTab = component.find("#agenciaCamaraContentTab").find("button");
    agenciaCamaraContentTab.simulate('click');
    

});
