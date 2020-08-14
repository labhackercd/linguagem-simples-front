import React from 'react'
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import NewSessionFormComponent from './../index'
import { mount} from 'enzyme';



test('Test if NewSessionFormComponent renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<NewSessionFormComponent></NewSessionFormComponent>, div)
    ReactDOM.unmountComponentAtNode(div)
});


test('Render Local Text', () => {
    const { getByText } = render(<NewSessionFormComponent />);
    const linkElement = getByText('Local');
    expect(linkElement).toBeInTheDocument();
});

test('test onchange of session date input field', () => {
    const  wrapper = mount(<NewSessionFormComponent />);
    const sessionDate = wrapper.find("input").at(2);

    sessionDate.instance().value = "13/20/2012";
    sessionDate.simulate("change");
    expect(wrapper.find("input").at(2).prop('value')).toEqual("13/20/2012");
});

test('test onchange of session type input field', () => {
    const  wrapper = mount(<NewSessionFormComponent />);
    const sessionType = wrapper.find("input").at(3);
    sessionType.instance().value = "presential";
    sessionType.simulate("change");
    expect(wrapper.find("input").at(3).prop('value')).toEqual("presential");
});

test('test onchange of acompanheTransmissionChannel input field', () => {
    const  wrapper = mount(<NewSessionFormComponent />);
    const acompanheTransmissionChannel = wrapper.find("input").at(4);
    acompanheTransmissionChannel.simulate("change",{ target: { checked: false }});

    expect(wrapper.find("input").at(4).prop('checked')).toEqual(false);
});

test('test onchange of twitterTransmissionChannel input field', () => {
    const  wrapper = mount(<NewSessionFormComponent />);
    const twitterTransmissionChannel = wrapper.find("input").at(5);
    twitterTransmissionChannel.simulate("change",{ target: { checked: false }});

    expect(wrapper.find("input").at(5).prop('checked')).toEqual(false);
});

test('test click on submit button', () => {
    const  wrapper = mount(<NewSessionFormComponent />);
    const button = wrapper.find("button").at(0);
    button.simulate('click')

});
