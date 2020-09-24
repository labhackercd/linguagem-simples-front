import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';
import StartBroadcastAlert from './../Dialogs/Alert/StartBroadcast';
import {shallow, mount} from "enzyme/build";
import ReactDOM from 'react-dom';
import MockTheme from './../mockTheme';

describe("<Header />", () => {
  it("with mount", () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MockTheme>
        <Header />
      </MockTheme>,
      div
    );
  });

  it("doesnt break on start stream button click", () => {
    const wrapper = mount(<MockTheme>
                            <Header setBroadcastingStatus={jest.fn()}
                    								broadcastingOnline={false}/>
                          </MockTheme>);
    const startStreamButton = wrapper.find('#start-stream').last();
    expect(startStreamButton.length).toBe(1);
    startStreamButton.simulate('click');
  });

  it("doesnt break on end stream button click", () => {
    const wrapper = mount(<MockTheme>
                            <Header setBroadcastingStatus={jest.fn()}
                    								broadcastingOnline={true}/>
                          </MockTheme>);
    const endStreamButton = wrapper.find('#end-stream').last();
    expect(endStreamButton.length).toBe(1);
    endStreamButton.simulate('click');
  });

  it("sets sends correct value to API", () => {
    const wrapper = mount(<MockTheme>
                            <Header setBroadcastingStatus={jest.fn()}
                    								broadcastingOnline={false}/>
                          </MockTheme>);
    const startStreamButton = wrapper.find('#start-stream').last();
    startStreamButton.simulate('click');
    // find the Home MenuItem
    const startBroadcastDialog = wrapper.findWhere(node => node.is(StartBroadcastAlert));
    // make sure it was rendered
    expect(startBroadcastDialog.exists()).toBe(true);
    const yesButton = startBroadcastDialog.find('#start-broadcast').last()
    yesButton.simulate('click')
  })
});
