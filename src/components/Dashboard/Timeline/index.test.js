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
import axiosInstance from './../../../auth/axiosApi';
import MockTheme from './mockTheme';
import { Button } from '@material-ui/core';

window.alert = jest.fn();
const mockSessionInfo = {"id":1,"author":{"id":1,"is_superuser":true,"email":"admin","first_name":"","last_name":"","email":"a@a.com","profile":"editor"},"location":"plenary","date":"2020-09-24","type_session":"virtual","situation_session":"pre_session","resume":"Resumo","enable":true,"id_session_dados_abertos":null}
it("snapshot should not have differences", () => {
    const component = shallow(<Timeline/>);
    expect(component).toMatchSnapshot();
});


describe('Test internal components', () => {
  const wrapper = mount(<MockTheme>
                          <Timeline sessionID={1}
                                    broadcastingOnline={true}
                                    setBroadcastingStatus={jest.fn()}
                                    sessionInfo={mockSessionInfo}></Timeline>
                        </MockTheme>);

  test('test summary box button click', () => {
    const summaryBoxWrapper = wrapper.findWhere(node => node.is(SummaryBox));
    const summaryBoxTextField = summaryBoxWrapper.find('#summary-box-textfield').last()
    summaryBoxTextField.instance().value = "summaryBox test";
    summaryBoxTextField.simulate("change");
    const summaryBoxButton = summaryBoxWrapper.find('#summary-box-submit-button').last()
    summaryBoxButton.simulate('click');
    })

  test('test session status', () => {
    const statusSelectionWrapper = wrapper.findWhere(node => node.is(StatusSelection));
    const statusSelectionButton = statusSelectionWrapper.findWhere(node => node.is(Button)).last();
    statusSelectionButton.simulate('click');
    })

  test('simple text input', () => {
    const newUpdateWrapper = wrapper.findWhere(node => node.is(NewUpdate));
    const textField = newUpdateWrapper.find('#newUpdateTextField').last()
    textField.instance().value = "new update test";
    textField.simulate("change");
    const newUpdateButton = newUpdateWrapper.find('#updateSubmitButton').last()
    newUpdateButton.simulate('click');
  })
})
