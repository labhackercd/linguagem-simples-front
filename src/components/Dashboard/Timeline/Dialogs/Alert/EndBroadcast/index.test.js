import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow, mount} from "enzyme/build";
import ReactDOM from "react-dom";
import EndBroadcastAlert from './index.js';
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
        <EndBroadcastAlert open={true}/>
      </MockTheme>,
      div
    );
  });
  it("hits setValue inside useEffect", () => {
    const mockOnClose = jest.fn();
    const mockValue = true;
    const wrapper = mount(<MockTheme>
                            <EndBroadcastAlert
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
                            <EndBroadcastAlert
                              open={true}
                              onClose={mockOnClose}
                              value={mockValue}
                            />
                          </MockTheme>);
    const yesButton = wrapper.find('#end-broadcast').last();
    const cancelButton = wrapper.find('#cancel-flow-broadcast').last();
    expect(yesButton.length).toBe(1); // It finds it alright
    expect(cancelButton.length).toBe(1);
    yesButton.simulate('click');
    cancelButton.simulate('click');
  })
});
