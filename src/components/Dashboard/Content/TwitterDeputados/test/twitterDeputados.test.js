import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import TwitterDeputadosContent from '../twitterDeputados'
import { mount} from 'enzyme';

it("should render the TwitterDeputados section", () => {
    const component = shallow(<TwitterDeputadosContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test("Test agencia content lifeclycle with search", async (done) => {

            
    const wrapper = await mount(<TwitterDeputadosContent sessionId={1}/>);


        wrapper.update();
        //console.log(wrapper.debug())

        const searchField = wrapper.find("input").at(0);
        //console.log(searchField.debug());
        searchField.instance().value = "presential";
        searchField.simulate("change");
        //expect(wrapper.find("input").at(0).prop('value')).toEqual("presential");
        

        done();


  });