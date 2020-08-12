import React from 'react'
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import SessionHistoryComponent from './../index'
import renderer from 'react-test-renderer';
import moxios from 'moxios'
import{responseData} from './requestData'
import{responseVerify} from './verifyresponse'
import axiosInstance from './../../../../auth/axiosApi'

import {shallow,mount} from "enzyme/build";


test('Test if SessionHistoryComponent renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<SessionHistoryComponent></SessionHistoryComponent>, div)
    ReactDOM.unmountComponentAtNode(div)
});



test('Test if SessionHistoryComponent snapshot matches', () => {
    const component = renderer.create(
        <SessionHistoryComponent></SessionHistoryComponent>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

/*

it('Test if components matches snapshot', () => {  
    const TextInputComponent = renderercreate(<NewSessionFormComponent />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});
*/
