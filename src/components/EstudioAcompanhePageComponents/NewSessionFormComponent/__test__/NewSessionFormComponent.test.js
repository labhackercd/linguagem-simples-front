import React from 'react'
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import NewSessionFormComponent from './../index'
import { mount} from 'enzyme';

import MockAdapter from "axios-mock-adapter"
import axiosInstance from './../../../../auth/axiosApi'
import {API_SESSIONS_URL} from './../../../../api_urls'

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


describe('Testing lifeclycle ', () => {
    var response = {
        data: {
            "id": 4,
            "author": {
              "id": 1,
              "is_superuser": true,
              "username": "jpnsoares",
              "first_name": "",
              "last_name": "",
              "email": "jpnsoares@email.com",
              "profile": "editor"
            },
            "location": "plenary",
            "date": "2020-09-03",
            "type_session": "virtual",
            "situation_session": "pre_session",
            "resume": "string",
            "enable": true,
            "id_session_dados_abertos": "string"
          }, 
        status: 201, 
        statusText: "Created", 
       
    }; 
    var mockInstance = new MockAdapter(axiosInstance);
    
    test("Test sync lifeclycle", async (done) => {
        // Return a fixed timestamp when moment().format() is called

        await mockInstance.onPost(API_SESSIONS_URL).reply(200,{response})
                
        const  wrapper = mount(<NewSessionFormComponent />);
        const button = wrapper.find("#submitButton").at(0);
        button.simulate('click')

        done();
    });

    afterAll(() => {
        mockInstance.restore();
    });


});