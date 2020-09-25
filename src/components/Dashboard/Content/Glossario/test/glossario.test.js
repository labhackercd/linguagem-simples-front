import React from 'react';
import { render, screen } from '@testing-library/react';
import GlossarioContent from '../glossario'
import { mount} from 'enzyme';

it("should render the GlossarioContent section", (done) => {
    const component = mount(<GlossarioContent/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();

    setImmediate(() => {
        component.update();
        //console.log(wrapper.debug())
        const searchField = component.find("input").at(0);
        //console.log(searchField.debug());
        searchField.instance().value = "presential";
        searchField.simulate("change");
  
        //console.log(wrapper.debug())
        done();
     })
  
});
