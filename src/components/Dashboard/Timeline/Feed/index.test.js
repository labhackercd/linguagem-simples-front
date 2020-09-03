import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from './index';
import {shallow} from "enzyme/build";
import ReactDOM from 'react-dom';

it("snapshot should match", () => {
    const props = {
      updates: [{
        id: 1,
        content: 'test',
        time: '18:00',
      }]
    }
    const component = shallow(<Feed {...props} />);
    expect(component).toMatchSnapshot();
});

test('Test if Feed renders without crash', () => {
    const div = document.createElement("div")
    const props = {
      updates: [{
        id: 1,
        content: 'test',
        time: '18:00',
      }]
    }
    ReactDOM.render(<Feed {...props}></Feed>, div)
    ReactDOM.unmountComponentAtNode(div)
});
