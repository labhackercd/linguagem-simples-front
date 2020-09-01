import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from './index';
import {shallow} from "enzyme/build";

it("should render the Feed section", () => {
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
