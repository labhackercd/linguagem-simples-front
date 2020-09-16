
import React from 'react';
import {shallow} from "enzyme/build";

import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CustomizedSnackbars from '../'

it("Should render the SavedContentComponent", () => {
    const component = shallow(<CustomizedSnackbars open={true} message={"Mensagem Teste"} type={"error"}></CustomizedSnackbars>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});


describe('Testing render of different types', () => {

    test("Test if sucess alert is rendered", async (done) => {
          
        const  wrapper = mount(<CustomizedSnackbars open={true} message={"Mensagem Teste"} type={"success"}></CustomizedSnackbars>);
        expect(wrapper.exists()).toEqual(true);

        done();
    });

    test("Test if error alert is rendered", async (done) => {
      
        const  wrapper = mount(<CustomizedSnackbars open={true} message={"Mensagem Teste"} type={"error"}></CustomizedSnackbars>);
        expect(wrapper.exists()).toEqual(true);

        done();
    });

    test("Test handle close", async (done) => {
      
        const  wrapper = mount(<CustomizedSnackbars open={true} message={"Mensagem Teste"} type={"error"}></CustomizedSnackbars>);
        const button = wrapper.find("button").at(0);
        button.simulate('click');
        done();
    });
});