import React from 'react';
import Sidebar from './index';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';



it("should render the content section", () => {
    const component = shallow(<Sidebar/>);
    expect(component).toMatchSnapshot();
});


test("Test logout button at sidebar", () => {
    const  wrapper = mount(<Sidebar />);
    const button = wrapper.find("#logoutButton").at(0);
    button.simulate('click')

});