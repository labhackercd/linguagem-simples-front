import React from 'react';
import { screen } from '@testing-library/react';
import {shallow, render, mount} from "enzyme";
import Timeline from './index';
import Header from './Header';
import StatusSelection from './StatusSelection';
import NewUpdate from './NewUpdate';
import Feed from './Feed';
import SummaryBox from './SummaryBox';
import ReactDOM from 'react-dom';
import MockAdapter from "axios-mock-adapter"
import axiosInstance from './../../../auth/axiosApi'
window.alert = jest.fn();

it("snapshot should not have differences", () => {
    const component = shallow(<Timeline/>);
    expect(component).toMatchSnapshot();
});


describe('Test if Timeline loads internal components', () => {
  test('if commponents are present', () => {
    const wrapper = mount(<Timeline sessionID={1} />);
    const header = wrapper.containsMatchingElement(<Header />);
    const statusSelection = wrapper.containsMatchingElement(<StatusSelection />);
    const newUpdate = wrapper.containsMatchingElement(<NewUpdate />);
    const summaryBox = wrapper.containsMatchingElement(<SummaryBox />);
    expect(header).toBeTruthy()
    expect(statusSelection).toBeTruthy()
    expect(newUpdate).toBeTruthy()
    expect(summaryBox).toBeTruthy()
    wrapper.unmount();
    })
})
