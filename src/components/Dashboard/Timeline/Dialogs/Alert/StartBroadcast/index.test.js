import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow, mount} from "enzyme/build";
import ReactDOM from "react-dom";
import StartBroadcastAlert from './index.js';
import { unwrap } from "@material-ui/core/test-utils";
import { ThemeProvider } from '@material-ui/core/styles';
import { customTheme } from './../../../../../../theme.js';
import { createMuiTheme } from '@material-ui/core';
import MockTheme from './../../../mockTheme';


describe("<EndBroadcastAlert />", () => {
  it("with mount", () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MockTheme>
        <StartBroadcastAlert open={true}/>
      </MockTheme>,
      div
    );
  });
  it("hits setValue inside useEffect", () => {
    const mockOnClose = jest.fn();
    const mockValue = true;
    const wrapper = mount(<MockTheme>
                            <StartBroadcastAlert
                              open={false}
                              onClose={mockOnClose}
                              value={mockValue}
                            />
                          </MockTheme>);
  });
  it("doesn't break on button click", () => {
    const mockOnClose = jest.fn();
    const mockValue = true;
    const wrapper = mount(<MockTheme>
                            <StartBroadcastAlert
                              open={true}
                              onClose={mockOnClose}
                              value={mockValue}
                            />
                          </MockTheme>);
    const yesButton = wrapper.find('#start-broadcast').last();
    const cancelButton = wrapper.find('#start-broadcast-cancel').last();
    const exitButton = wrapper.find('#exit-button-start-broadcast').last();
    expect(yesButton.length).toBe(1); // It finds it alright
    expect(cancelButton.length).toBe(1);
    expect(exitButton.length).toBe(1);
    yesButton.simulate('click');
    cancelButton.simulate('click');
    exitButton.simulate('click');
  })
});
